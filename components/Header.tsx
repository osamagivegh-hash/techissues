'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language, t } from '@/lib/i18n';

export default function Header({ lang }: { lang: Language }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    // Close mobile menu when clicking a link
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href={`/${lang}`} className="flex items-center gap-2" onClick={closeMobileMenu}>
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">ت</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                {t(lang, 'techAndLife')}
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
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
                            href={`/${lang}/category/psychology`}
                            className="text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            {t(lang, 'psychology')}
                        </Link>
                        <Link
                            href={`/${lang}/category/sports-benefits`}
                            className="text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            {t(lang, 'sportsBenefits')}
                        </Link>
                        <Link
                            href={`/${lang}/category/food-benefits`}
                            className="text-gray-700 hover:text-primary-600 transition-colors"
                        >
                            {t(lang, 'foodBenefits')}
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
                            className="px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs font-medium"
                        >
                            {lang === 'ar' ? 'EN' : 'عربي'}
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            // Close icon
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            // Menu icon
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
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-gray-200 animate-fadeIn h-[calc(100vh-4rem)] overflow-y-auto">
                        <div className="flex flex-col gap-2 pb-20">
                            <Link
                                href={`/${lang}`}
                                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors rounded-lg"
                                onClick={closeMobileMenu}
                            >
                                {t(lang, 'home')}
                            </Link>
                            <Link
                                href={`/${lang}/category/programming`}
                                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors rounded-lg"
                                onClick={closeMobileMenu}
                            >
                                {t(lang, 'programming')}
                            </Link>
                            <Link
                                href={`/${lang}/category/tech-issues`}
                                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors rounded-lg"
                                onClick={closeMobileMenu}
                            >
                                {t(lang, 'techIssues')}
                            </Link>
                            <Link
                                href={`/${lang}/category/device-reviews`}
                                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors rounded-lg"
                                onClick={closeMobileMenu}
                            >
                                {t(lang, 'deviceReviews')}
                            </Link>
                            <Link
                                href={`/${lang}/category/psychology`}
                                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors rounded-lg"
                                onClick={closeMobileMenu}
                            >
                                {t(lang, 'psychology')}
                            </Link>
                            <Link
                                href={`/${lang}/category/sports-benefits`}
                                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors rounded-lg"
                                onClick={closeMobileMenu}
                            >
                                {t(lang, 'sportsBenefits')}
                            </Link>
                            <Link
                                href={`/${lang}/category/food-benefits`}
                                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors rounded-lg"
                                onClick={closeMobileMenu}
                            >
                                {t(lang, 'foodBenefits')}
                            </Link>
                            <Link
                                href={`/${lang}/search`}
                                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors rounded-lg"
                                onClick={closeMobileMenu}
                            >
                                {t(lang, 'search')}
                            </Link>

                            {/* Mobile Language Switcher */}
                            <Link
                                href={switchLanguage()}
                                className="mx-4 mt-2 px-4 py-3 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors font-medium"
                                onClick={closeMobileMenu}
                            >
                                {lang === 'ar' ? 'English' : 'العربية'}
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
