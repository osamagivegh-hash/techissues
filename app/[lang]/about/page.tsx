import { Metadata } from 'next';
import { Language } from '@/lib/i18n';

interface AboutPageProps {
    params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: `${lang === 'ar' ? 'من نحن' : 'About Us'} - ${lang === 'ar' ? 'مدونة التقنية' : 'Tech Blog'}`,
    };
}

export default async function AboutPage({ params }: AboutPageProps) {
    const { lang } = await params;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container-custom py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    {lang === 'ar' ? 'من نحن' : 'About Us'}
                </h1>

                <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none">
                    {lang === 'ar' ? (
                        <>
                            <p>
                                مرحباً بك في <strong>مدونة التقنية</strong>، وجهتك الأولى للحصول على محتوى تقني عالي الجودة باللغة العربية.
                            </p>

                            <h2>رسالتنا</h2>
                            <p>
                                نسعى لتوفير محتوى تقني شامل ومفيد يغطي مجالات البرمجة، حل المشاكل التقنية، ومراجعات الأجهزة.
                            </p>

                            <h2>ما نقدمه</h2>
                            <ul>
                                <li><strong>مقالات برمجية</strong>: دروس وشروحات في مختلف لغات البرمجة</li>
                                <li><strong>حلول تقنية</strong>: حل المشاكل الشائعة في الأنظمة والبرامج</li>
                                <li><strong>مراجعات الأجهزة</strong>: تقييمات شاملة لأحدث الأجهزة التقنية</li>
                            </ul>

                            <h2>تواصل معنا</h2>
                            <p>
                                نحن نرحب بتعليقاتكم واستفساراتكم. لا تتردد في التواصل معنا عبر صفحة الاتصال.
                            </p>
                        </>
                    ) : (
                        <>
                            <p>
                                Welcome to <strong>Tech Blog</strong>, your premier destination for high-quality technical content.
                            </p>

                            <h2>Our Mission</h2>
                            <p>
                                We aim to provide comprehensive and useful technical content covering programming, troubleshooting, and device reviews.
                            </p>

                            <h2>What We Offer</h2>
                            <ul>
                                <li><strong>Programming Articles</strong>: Tutorials and guides in various programming languages</li>
                                <li><strong>Tech Solutions</strong>: Solutions to common problems in systems and software</li>
                                <li><strong>Device Reviews</strong>: Comprehensive reviews of the latest tech devices</li>
                            </ul>

                            <h2>Contact Us</h2>
                            <p>
                                We welcome your comments and inquiries. Feel free to reach out via our contact page.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
