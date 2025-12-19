import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLanguage, isValidLanguage } from './lib/i18n';

/**
 * Security-hardened middleware
 * Includes: Rate limiting, security headers, body size limits, RSC validation
 */

// ============================================
// RATE LIMITING (Edge-compatible in-memory store)
// ============================================
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

function getRateLimitConfig(path: string) {
    if (path.includes('/auth/login')) {
        return { windowMs: 15 * 60 * 1000, max: 10 }; // 10 per 15 min
    }
    if (path.startsWith('/api/')) {
        return { windowMs: 60 * 1000, max: 60 }; // 60 per minute
    }
    return { windowMs: 60 * 1000, max: 200 }; // 200 per minute for pages
}

function checkRateLimit(ip: string, path: string): { allowed: boolean; remaining: number } {
    const config = getRateLimitConfig(path);
    const now = Date.now();
    const key = `${ip}:${path.split('/')[1] || 'root'}`;

    // Cleanup old entries (1% chance per request)
    if (Math.random() < 0.01) {
        for (const [k, v] of rateLimitMap.entries()) {
            if (now - v.timestamp > config.windowMs) {
                rateLimitMap.delete(k);
            }
        }
    }

    const entry = rateLimitMap.get(key);

    if (!entry || now - entry.timestamp > config.windowMs) {
        rateLimitMap.set(key, { count: 1, timestamp: now });
        return { allowed: true, remaining: config.max - 1 };
    }

    if (entry.count >= config.max) {
        return { allowed: false, remaining: 0 };
    }

    entry.count++;
    return { allowed: true, remaining: config.max - entry.count };
}

// ============================================
// SECURITY HEADERS
// ============================================
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// ============================================
// RSC PAYLOAD VALIDATION
// ============================================
function isValidRscPayload(request: NextRequest): boolean {
    // Check for RSC-specific headers
    const rscHeader = request.headers.get('rsc');
    const nextAction = request.headers.get('next-action');

    // If RSC request, validate
    if (rscHeader || nextAction) {
        // Check content-length for DoS prevention
        const contentLength = request.headers.get('content-length');
        if (contentLength) {
            const size = parseInt(contentLength, 10);
            // Block RSC payloads larger than 1MB
            if (size > 1024 * 1024) {
                return false;
            }
        }

        // Block if action ID looks suspicious
        if (nextAction && (nextAction.includes('..') || nextAction.includes('<'))) {
            return false;
        }
    }

    return true;
}

// ============================================
// BODY SIZE CHECK
// ============================================
function checkBodySize(request: NextRequest): boolean {
    const contentLength = request.headers.get('content-length');
    if (!contentLength) return true;

    const size = parseInt(contentLength, 10);
    const maxSize = request.url.includes('/api/images') ? 10 * 1024 * 1024 : 2 * 1024 * 1024;

    return size <= maxSize;
}

// ============================================
// MAIN MIDDLEWARE
// ============================================
export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        'anonymous';

    // 1. Rate limiting for API routes
    if (pathname.startsWith('/api/')) {
        const { allowed, remaining } = checkRateLimit(ip, pathname);

        if (!allowed) {
            return new NextResponse(
                JSON.stringify({ error: 'Too many requests. Please try again later.' }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': '60',
                        ...securityHeaders,
                    },
                }
            );
        }

        // 2. Body size check
        if (!checkBodySize(request)) {
            return new NextResponse(
                JSON.stringify({ error: 'Request body too large' }),
                {
                    status: 413,
                    headers: {
                        'Content-Type': 'application/json',
                        ...securityHeaders,
                    },
                }
            );
        }

        // 3. RSC payload validation
        if (!isValidRscPayload(request)) {
            return new NextResponse(
                JSON.stringify({ error: 'Invalid request' }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        ...securityHeaders,
                    },
                }
            );
        }

        // Add rate limit headers and continue
        const response = NextResponse.next();
        response.headers.set('X-RateLimit-Remaining', remaining.toString());
        Object.entries(securityHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });
        return response;
    }

    // Skip middleware for admin, static files, special routes, and SEO files
    if (
        pathname.startsWith('/admin') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.includes('/uploads/') ||
        pathname === '/ads.txt' ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml' ||
        pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/)
    ) {
        const response = NextResponse.next();
        Object.entries(securityHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });
        return response;
    }

    // Check if pathname starts with a language
    const pathnameHasLang = isValidLanguage(pathname.split('/')[1]);

    // If on root, redirect to default language
    if (pathname === '/') {
        const response = NextResponse.redirect(new URL(`/${defaultLanguage}`, request.url));
        Object.entries(securityHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });
        return response;
    }

    // If no valid language in path, redirect to default language
    if (!pathnameHasLang) {
        const response = NextResponse.redirect(
            new URL(`/${defaultLanguage}${pathname}`, request.url)
        );
        Object.entries(securityHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });
        return response;
    }

    const response = NextResponse.next();
    Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });
    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next static files
         * - image files
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};

