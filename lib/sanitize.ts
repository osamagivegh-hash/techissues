/**
 * HTML Sanitization Utility
 * Protects against XSS attacks when rendering user-generated HTML content
 */

// Server-side sanitization using regex-based approach for SSR compatibility
// Note: For full protection, use DOMPurify on client-side as well

/**
 * List of allowed HTML tags for blog content
 */
const ALLOWED_TAGS = new Set([
    'p', 'br', 'hr',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'strong', 'b', 'em', 'i', 'u', 's', 'mark',
    'ul', 'ol', 'li',
    'a',
    'img',
    'blockquote', 'pre', 'code',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'div', 'span',
    'figure', 'figcaption',
]);

/**
 * List of allowed attributes per tag
 */
const ALLOWED_ATTRS: Record<string, Set<string>> = {
    'a': new Set(['href', 'title', 'target', 'rel']),
    'img': new Set(['src', 'alt', 'title', 'width', 'height', 'loading']),
    '*': new Set(['class', 'id', 'style', 'dir', 'lang']),
};

/**
 * Dangerous patterns to remove
 */
const DANGEROUS_PATTERNS = [
    // Script injection
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    // Event handlers
    /\s+on\w+\s*=\s*["'][^"']*["']/gi,
    /\s+on\w+\s*=\s*[^\s>]+/gi,
    // JavaScript URLs
    /javascript\s*:/gi,
    /vbscript\s*:/gi,
    /data\s*:\s*text\/html/gi,
    // Expression/behavior (IE)
    /expression\s*\(/gi,
    /behavior\s*:/gi,
    // Object/embed tags
    /<object[\s\S]*?>[\s\S]*?<\/object>/gi,
    /<embed[\s\S]*?>/gi,
    /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi,
    // Form elements that could be dangerous
    /<form[\s\S]*?>[\s\S]*?<\/form>/gi,
    /<input[\s\S]*?>/gi,
    /<button[\s\S]*?>[\s\S]*?<\/button>/gi,
    // SVG with scripts
    /<svg[\s\S]*?on\w+[\s\S]*?>/gi,
    // Style with expressions
    /style\s*=\s*["'][^"']*expression\s*\([^"']*["']/gi,
    // Base tag hijacking
    /<base[\s\S]*?>/gi,
    // Meta refresh
    /<meta[\s\S]*?http-equiv[\s\S]*?>/gi,
    // Link with import
    /<link[\s\S]*?rel\s*=\s*["']import["'][\s\S]*?>/gi,
];

/**
 * Sanitize HTML content for safe rendering
 * This is a server-side compatible sanitizer
 */
export function sanitizeHtml(html: string): string {
    if (!html || typeof html !== 'string') {
        return '';
    }

    let cleaned = html;

    // Remove dangerous patterns
    for (const pattern of DANGEROUS_PATTERNS) {
        cleaned = cleaned.replace(pattern, '');
    }

    // Sanitize remaining href/src attributes for javascript: protocol
    cleaned = cleaned.replace(
        /(<a[^>]*href\s*=\s*["'])javascript:[^"']*(["'][^>]*>)/gi,
        '$1#$2'
    );

    // Ensure external links have proper attributes
    cleaned = cleaned.replace(
        /<a\s+([^>]*href\s*=\s*["']https?:\/\/[^"']+["'][^>]*)>/gi,
        (match, attrs) => {
            // Add rel="noopener noreferrer" and target="_blank" for external links
            if (!attrs.includes('rel=')) {
                attrs += ' rel="noopener noreferrer"';
            }
            if (!attrs.includes('target=')) {
                attrs += ' target="_blank"';
            }
            return `<a ${attrs}>`;
        }
    );

    // Validate image sources (only allow https and data URIs for images)
    cleaned = cleaned.replace(
        /(<img[^>]*src\s*=\s*["'])([^"']*)["']/gi,
        (match, prefix, src) => {
            if (src.startsWith('https://') || src.startsWith('data:image/')) {
                return `${prefix}${src}"`;
            }
            // Block non-HTTPS images
            return `${prefix}#"`;
        }
    );

    return cleaned;
}

/**
 * Strip all HTML tags, leaving only text
 */
export function stripHtml(html: string): string {
    if (!html || typeof html !== 'string') {
        return '';
    }
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
}

/**
 * Truncate HTML content safely without breaking tags
 */
export function truncateHtml(html: string, maxLength: number): string {
    const stripped = stripHtml(html);
    if (stripped.length <= maxLength) {
        return html;
    }
    return stripped.substring(0, maxLength) + '...';
}

/**
 * Escape HTML entities for safe display in text context
 */
export function escapeHtml(text: string): string {
    if (!text || typeof text !== 'string') {
        return '';
    }
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
