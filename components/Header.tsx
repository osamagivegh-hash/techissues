'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language, t, languages } from '@/lib/i18n';

export default function Header({ lang }: { lang: Language }) {
    const pathname = usePathname();

    // Get the current path without language prefix
    const getPathWithoutLang = () => {
        const segments = pathname.split('/');
        segments.shift(); // Remove empty first segment
        segments.shift(); // Remove language segment
        return '/' + segments.join('/');
    };

    // Switch language function
    const switchLanguage = () => {
        const newLang = lang === 'ar' ? 'en' : 'ar';
        const pathWithoutLang = getPathWithoutLang();
        return `/${newLang}${pathWithoutLang}`;
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href={`/${lang}`} className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">ت</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                {lang === 'ar' ? 'مدونة التقنية' : 'Tech Blog'}
                            </h1>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href={`/${lang}`}
                            className="text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            {t(lang, 'home')}
                        </Link>
                        <Link
                            href={`/${lang}/category/programming`}
                            className="text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            {t(lang, 'programming')}
                        </Link>
                        <Link
                            href={`/${lang}/category/tech-issues`}
                            className="text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            {t(lang, 'techIssues')}
                        </Link>
                        <Link
                            href={`/${lang}/category/device-reviews`}
                            className="text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            {t(lang, 'deviceReviews')}
                        </Link>
                        <Link
                            href={`/${lang}/search`}
                            className="text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            {t(lang, 'search')}
                        </Link>

                        {/* Language Switcher */}
                        <Link
                            href={switchLanguage()}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                        >
                            {lang === 'ar' ? 'EN' : 'عربي'}
                        </Link>
                    </nav>

                    {/* Mobile Menu Button - Simplified for now */}
                    <button className="md:hidden p-2">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
