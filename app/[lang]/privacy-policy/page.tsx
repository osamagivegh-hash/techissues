import { Metadata } from 'next';
import { Language } from '@/lib/i18n';

interface PrivacyPageProps {
    params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: `${lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'} - ${lang === 'ar' ? 'مدونة التقنية' : 'Tech Blog'}`,
    };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
    const { lang } = await params;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container-custom py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </h1>

                <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none">
                    {lang === 'ar' ? (
                        <>
                            <p><strong>آخر تحديث:</strong> ديسمبر 2025</p>

                            <h2>المقدمة</h2>
                            <p>
                                نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك.
                            </p>

                            <h2>المعلومات التي نجمعها</h2>
                            <p>قد نجمع المعلومات التالية:</p>
                            <ul>
                                <li>معلومات الاستخدام (الصفحات المشاهدة، الوقت المستغرق)</li>
                                <li>معلومات الجهاز (نوع المتصفح، نظام التشغيل)</li>
                                <li>عنوان IP</li>
                            </ul>

                            <h2>استخدام المعلومات</h2>
                            <p>نستخدم المعلومات لتحسين تجربة المستخدم وتقديم محتوى مخصص.</p>

                            <h2>Google AdSense</h2>
                            <p>
                                قد يستخدم هذا الموقع Google AdSense لعرض الإعلانات. قد يستخدم Google ملفات تعريف الارتباط لتقديم إعلانات مخصصة.
                            </p>

                            <h2>حقوقك</h2>
                            <p>لديك الحق في طلب الوصول إلى بياناتك الشخصية أو حذفها.</p>

                            <h2>تواصل معنا</h2>
                            <p>للأسئلة حول سياسة الخصوصية، يرجى الاتصال بنا عبر: info@techissues.com</p>
                        </>
                    ) : (
                        <>
                            <p><strong>Last Updated:</strong> December 2025</p>

                            <h2>Introduction</h2>
                            <p>
                                We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information.
                            </p>

                            <h2>Information We Collect</h2>
                            <p>We may collect the following information:</p>
                            <ul>
                                <li>Usage information (pages viewed, time spent)</li>
                                <li>Device information (browser type, operating system)</li>
                                <li>IP address</li>
                            </ul>

                            <h2>Use of Information</h2>
                            <p>We use information to improve user experience and deliver personalized content.</p>

                            <h2>Google AdSense</h2>
                            <p>
                                This site may use Google AdSense to display advertisements. Google may use cookies to serve personalized ads.
                            </p>

                            <h2>Your Rights</h2>
                            <p>You have the right to request access to or deletion of your personal data.</p>

                            <h2>Contact Us</h2>
                            <p>For questions about this privacy policy, please contact us at: info@techissues.com</p>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
