import Link from 'next/link';
import { Language, t } from '@/lib/i18n';

export default function Footer({ lang }: { lang: Language }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">
                            {lang === 'ar' ? 'التقنية والحياة' : 'Technology and Life'}
                        </h3>
                        <p className="text-sm">
                            {lang === 'ar'
                                ? 'مدونة التقنية والحياة: كل ما يهمك في عالم البرمجة، المشاكل التقنية، مراجعات الأجهزة، بالإضافة إلى الجوانب النفسية وفوائد الغذاء والرياضة.'
                                : 'Technology and Life Blog: Everything about programming, tech issues, device reviews, plus psychological aspects, food benefits, and sports.'}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">
                            {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href={`/${lang}`} className="hover:text-primary-400 transition-colors">
                                    {t(lang, 'home')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/about`} className="hover:text-primary-400 transition-colors">
                                    {t(lang, 'about')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/contact`} className="hover:text-primary-400 transition-colors">
                                    {t(lang, 'contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">
                            {lang === 'ar' ? 'الأقسام' : 'Categories'}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href={`/${lang}/category/programming`}
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    {t(lang, 'programming')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${lang}/category/tech-issues`}
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    {t(lang, 'techIssues')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${lang}/category/device-reviews`}
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    {t(lang, 'deviceReviews')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${lang}/category/psychology`}
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    {t(lang, 'psychology')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${lang}/category/sports-benefits`}
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    {t(lang, 'sportsBenefits')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${lang}/category/food-benefits`}
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    {t(lang, 'foodBenefits')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">
                            {lang === 'ar' ? 'قانوني' : 'Legal'}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href={`/${lang}/privacy-policy`}
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    {t(lang, 'privacy')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/terms`} className="hover:text-primary-400 transition-colors">
                                    {t(lang, 'terms')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>
                        &copy; {currentYear} {lang === 'ar' ? 'التقنية والحياة' : 'Technology and Life'}.{' '}
                        {lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
                    </p>
                </div>
            </div>
        </footer>
    );
}
