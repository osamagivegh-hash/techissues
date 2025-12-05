/**
 * Arabic to English transliteration map
 */
const arabicToEnglish: { [key: string]: string } = {
    'ا': 'a', 'أ': 'a', 'إ': 'e', 'آ': 'a',
    'ب': 'b', 'ت': 't', 'ث': 'th',
    'ج': 'j', 'ح': 'h', 'خ': 'kh',
    'د': 'd', 'ذ': 'th', 'ر': 'r', 'ز': 'z',
    'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd',
    'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh',
    'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l',
    'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w',
    'ي': 'y', 'ى': 'a', 'ة': 'h', 'ء': '',
    'ئ': 'e', 'ؤ': 'o', 'لا': 'la',
    // Common Arabic words transliteration
    'ال': 'al-',
};

/**
 * Transliterate Arabic text to English
 */
function transliterateArabic(text: string): string {
    let result = '';
    let i = 0;
    
    while (i < text.length) {
        // Check for two-character combinations first (like 'ال')
        const twoChars = text.substring(i, i + 2);
        if (arabicToEnglish[twoChars]) {
            result += arabicToEnglish[twoChars];
            i += 2;
        } else {
            const char = text[i];
            result += arabicToEnglish[char] || char;
            i++;
        }
    }
    
    return result;
}

/**
 * Generate a URL-friendly slug from a string
 * Supports Arabic and English titles
 */
export function generateSlug(text: string): string {
    if (!text || !text.trim()) {
        return '';
    }

    // First, extract any English words/numbers and tech terms
    const englishParts = text.match(/[a-zA-Z0-9]+/g) || [];
    
    // Check if there are meaningful English parts
    if (englishParts.length > 0 && englishParts.join('').length >= 3) {
        // Use English parts for the slug
        return englishParts
            .join('-')
            .toLowerCase()
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    
    // Transliterate Arabic text
    let slug = transliterateArabic(text);
    
    // Clean up the slug
    slug = slug
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove remaining special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces with hyphens
        .replace(/--+/g, '-') // Remove consecutive hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    
    // If slug is still empty or too short, generate a unique one
    if (!slug || slug.length < 3) {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 6);
        slug = `post-${timestamp}-${randomStr}`;
    }
    
    return slug;
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
