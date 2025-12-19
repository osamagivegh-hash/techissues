import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Security-hardened authentication module
 * CRITICAL: JWT_SECRET must be set in environment variables
 */

// Validate JWT_SECRET at module load time
function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        console.error('CRITICAL: JWT_SECRET environment variable is not set');
        throw new Error('JWT_SECRET must be configured');
    }

    // Check for insecure defaults
    const insecureDefaults = [
        'your-super-secret-jwt-key',
        'secret',
        'jwt-secret',
        'changeme',
        '12345',
    ];

    if (insecureDefaults.includes(secret.toLowerCase())) {
        console.error('CRITICAL: JWT_SECRET is using an insecure default value');
        throw new Error('JWT_SECRET is insecure');
    }

    // Check minimum length
    if (secret.length < 32) {
        console.warn('WARNING: JWT_SECRET should be at least 32 characters');
    }

    return secret;
}

export interface TokenPayload {
    userId: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    // Validate password
    if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }
    if (password.length > 128) {
        throw new Error('Password too long');
    }

    const salt = await bcrypt.genSalt(12); // Increased from 10 to 12 rounds
    return bcrypt.hash(password, salt);
}

/**
 * Compare a plain text password with a hashed password
 */
export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    if (!password || !hashedPassword) {
        return false;
    }
    return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate a JWT token
 */
export function generateToken(payload: TokenPayload): string {
    const secret = getJwtSecret();

    // Sanitize payload - remove any sensitive data
    const safePayload = {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
    };

    return jwt.sign(safePayload, secret, {
        expiresIn: '7d',
        algorithm: 'HS256',
    });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
    if (!token || typeof token !== 'string') {
        return null;
    }

    try {
        const secret = getJwtSecret();
        const decoded = jwt.verify(token, secret, {
            algorithms: ['HS256'], // Explicitly specify allowed algorithms
        }) as TokenPayload;

        // Validate token structure
        if (!decoded.userId || !decoded.email || !decoded.role) {
            return null;
        }

        return decoded;
    } catch (error) {
        // Don't log token details - security risk
        console.error('Token verification failed');
        return null;
    }
}

