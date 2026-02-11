export type Language = 'ar' | 'en';

export const languages: Language[] = ['ar', 'en'];

export const defaultLanguage: Language = 'ar';

export function isValidLanguage(lang: string): lang is Language {
    return languages.includes(lang as Language);
}

export function getLanguageDirection(lang: Language): 'rtl' | 'ltr' {
    return lang === 'ar' ? 'rtl' : 'ltr';
}

// Translations for UI elements
export const translations = {
    ar: {
        home: 'الرئيسية',
        programming: 'البرمجة',
        techIssues: 'المشاكل التقنية',
        deviceReviews: 'مراجعات الأجهزة',
        psychology: 'الجوانب النفسية',
        sportsBenefits: 'فوائد الرياضة',
        foodBenefits: 'فوائد الأطعمة',
        techAndLife: 'التقنية والحياة',
        search: 'بحث',
        about: 'من نحن',
        contact: 'اتصل بنا',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الاستخدام',
        viewAll: 'عرض الكل',
        latestPosts: 'أحدث المقالات',
        relatedPosts: 'مقالات ذات صلة',
        readingTime: 'دقائق قراءة',
        searchPlaceholder: 'ابحث عن مقالات...',
        noResults: 'لا توجد نتائج',
        noPosts: 'لا توجد مقالات حالياً',
        categoryNotFound: 'القسم غير موجود',
        postNotFound: 'المقال غير موجود',
        backToHome: 'العودة للرئيسية',
    },
    en: {
        home: 'Home',
        programming: 'Programming',
        techIssues: 'Tech Issues',
        deviceReviews: 'Device Reviews',
        psychology: 'Psychological Aspects',
        sportsBenefits: 'Sports Benefits',
        foodBenefits: 'Food Benefits',
        techAndLife: 'Technology and Life',
        search: 'Search',
        about: 'About',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
        viewAll: 'View All',
        latestPosts: 'Latest Posts',
        relatedPosts: 'Related Posts',
        readingTime: 'min read',
        searchPlaceholder: 'Search for articles...',
        noResults: 'No results found',
        noPosts: 'No posts available',
        categoryNotFound: 'Category not found',
        postNotFound: 'Post not found',
        backToHome: 'Back to Home',
    },
};

export function t(lang: Language, key: keyof typeof translations.ar): string {
    return translations[lang][key];
}

// Category slugs mapping
export const categorySlugs = {
    programming: {
        ar: 'البرمجة',
        en: 'Programming',
    },
    'tech-issues': {
        ar: 'المشاكل التقنية',
        en: 'Tech Issues',
    },
    'device-reviews': {
        ar: 'مراجعات الأجهزة',
        en: 'Device Reviews',
    },
    psychology: {
        ar: 'الجوانب النفسية',
        en: 'Psychological Aspects',
    },
    'sports-benefits': {
        ar: 'فوائد الرياضة',
        en: 'Sports Benefits',
    },
    'food-benefits': {
        ar: 'فوائد الأطعمة',
        en: 'Food Benefits',
    },
};
