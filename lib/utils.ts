/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Calculate reading time in minutes based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime || 1; // Minimum 1 minute
}

/**
 * Format a date to a readable string in Arabic
 * Using a consistent format to avoid hydration mismatches
 */
export function formatDate(date: Date | string): string {
    const d = new Date(date);

    // Use a simple, consistent format
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    const monthNames = [
        'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    return `${day} ${monthNames[month - 1]} ${year}`;
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}
