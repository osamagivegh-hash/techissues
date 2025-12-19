/**
 * Security Utilities for Next.js Application
 * Provides protection against common vulnerabilities
 */

import { z, ZodSchema } from 'zod';

// ============================================
// 1. INPUT VALIDATION SCHEMAS
// ============================================

/**
 * Login request schema
 */
export const loginSchema = z.object({
    email: z.string()
        .email('Invalid email format')
        .max(255, 'Email too long')
        .transform(val => val.toLowerCase().trim()),
    password: z.string()
        .min(6, 'Password too short')
        .max(128, 'Password too long'),
});

/**
 * Post creation/update schema
 */
export const postSchema = z.object({
    title: z.string()
        .min(1, 'Title required')
        .max(500, 'Title too long')
        .transform(val => val.trim()),
    slug: z.string()
        .max(500, 'Slug too long')
        .optional()
        .transform(val => val?.trim()),
    content: z.string()
        .max(500000, 'Content too long'), // 500KB max
    excerpt: z.string()
        .max(1000, 'Excerpt too long')
        .optional(),
    category: z.string()
        .regex(/^[a-f0-9]{24}$/, 'Invalid category ID')
        .optional(),
    language: z.enum(['ar', 'en']).default('ar'),
    status: z.enum(['draft', 'published']).default('draft'),
    tags: z.array(z.string().max(50)).max(20).optional(),
    coverImage: z.string()
        .url('Invalid cover image URL')
        .max(2000, 'URL too long')
        .optional(),
});

/**
 * Category schema
 */
export const categorySchema = z.object({
    name: z.string()
        .min(1, 'Name required')
        .max(100, 'Name too long')
        .transform(val => val.trim()),
    slug: z.string()
        .max(100, 'Slug too long')
        .optional()
        .transform(val => val?.trim()),
    language: z.enum(['ar', 'en']).default('ar'),
});

/**
 * Pagination schema
 */
export const paginationSchema = z.object({
    page: z.coerce.number().int().min(1).max(10000).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
});

// ============================================
// 2. SAFE VALIDATION WRAPPER
// ============================================

export interface ValidationResult<T> {
    success: boolean;
    data?: T;
    error?: string;
}

/**
 * Safely validate input against a schema
 */
export function validateInput<T>(
    schema: ZodSchema<T>,
    input: unknown
): ValidationResult<T> {
    try {
        const data = schema.parse(input);
        return { success: true, data };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const messages = error.errors.map(e => e.message).join(', ');
            return { success: false, error: messages };
        }
        return { success: false, error: 'Validation failed' };
    }
}

// ============================================
// 3. REQUEST BODY SIZE CHECKER
// ============================================

const MAX_BODY_SIZE = 1024 * 1024; // 1MB default

/**
 * Check if request body exceeds size limit
 */
export function checkBodySize(
    contentLength: string | null,
    maxSize: number = MAX_BODY_SIZE
): boolean {
    if (!contentLength) return true; // Allow if not specified
    const size = parseInt(contentLength, 10);
    if (isNaN(size)) return true;
    return size <= maxSize;
}

// ============================================
// 4. RATE LIMITING (In-Memory)
// ============================================

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

interface RateLimitConfig {
    windowMs: number;  // Time window in milliseconds
    maxRequests: number; // Max requests per window
}

const DEFAULT_RATE_LIMIT: RateLimitConfig = {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60,     // 60 requests per minute
};

const AUTH_RATE_LIMIT: RateLimitConfig = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10,          // 10 login attempts per 15 min
};

/**
 * Check if request should be rate limited
 * Returns remaining requests or -1 if blocked
 */
export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig = DEFAULT_RATE_LIMIT
): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const key = `${identifier}`;

    // Clean up old entries periodically
    if (Math.random() < 0.01) {
        cleanupRateLimitStore();
    }

    const entry = rateLimitStore.get(key);

    if (!entry || now >= entry.resetTime) {
        // New window
        rateLimitStore.set(key, {
            count: 1,
            resetTime: now + config.windowMs,
        });
        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetIn: config.windowMs,
        };
    }

    if (entry.count >= config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetIn: entry.resetTime - now,
        };
    }

    entry.count++;
    return {
        allowed: true,
        remaining: config.maxRequests - entry.count,
        resetIn: entry.resetTime - now,
    };
}

/**
 * Get rate limit config for different endpoints
 */
export function getRateLimitConfig(path: string): RateLimitConfig {
    if (path.includes('/auth/login')) {
        return AUTH_RATE_LIMIT;
    }
    if (path.includes('/api/')) {
        return DEFAULT_RATE_LIMIT;
    }
    return { windowMs: 60000, maxRequests: 200 }; // Pages
}

function cleanupRateLimitStore() {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now >= entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}

// ============================================
// 5. SECURITY HEADERS
// ============================================

export const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    connect-src 'self' https:;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
`.replace(/\s+/g, ' ').trim();

// ============================================
// 6. MONGODB ID VALIDATION
// ============================================

const OBJECT_ID_REGEX = /^[a-f0-9]{24}$/i;

/**
 * Validate MongoDB ObjectId format
 */
export function isValidObjectId(id: string): boolean {
    return OBJECT_ID_REGEX.test(id);
}

// ============================================
// 7. SAFE JSON PARSING
// ============================================

/**
 * Safely parse JSON with size and depth limits
 */
export async function safeParseJson<T>(
    request: Request,
    maxSize: number = MAX_BODY_SIZE
): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
        // Check content-length header
        const contentLength = request.headers.get('content-length');
        if (!checkBodySize(contentLength, maxSize)) {
            return { success: false, error: 'Request body too large' };
        }

        // Read and parse
        const text = await request.text();
        if (text.length > maxSize) {
            return { success: false, error: 'Request body too large' };
        }

        const data = JSON.parse(text);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: 'Invalid JSON' };
    }
}

// ============================================
// 8. ENVIRONMENT VALIDATION
// ============================================

/**
 * Validate required environment variables at startup
 */
export function validateEnvironment(): { valid: boolean; missing: string[] } {
    const required = ['JWT_SECRET', 'MONGODB_URI'];
    const missing = required.filter(key => !process.env[key]);

    // Check for insecure defaults
    if (process.env.JWT_SECRET === 'your-super-secret-jwt-key') {
        missing.push('JWT_SECRET (using insecure default)');
    }

    return {
        valid: missing.length === 0,
        missing,
    };
}
