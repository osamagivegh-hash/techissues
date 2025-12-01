import { Metadata } from 'next';
import { Language } from '@/lib/i18n';

interface TermsPageProps {
    params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: `${lang === 'ar' ? 'شروط الاستخدام' : 'Terms of Use'} - ${lang === 'ar' ? 'مدونة التقنية' : 'Tech Blog'}`,
    };
}

export default async function TermsPage({ params }: TermsPageProps) {
    const { lang } = await params;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container-custom py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    {lang === 'ar' ? 'شروط الاستخدام' : 'Terms of Use'}
                </h1>

                <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none">
                    {lang === 'ar' ? (
                        <>
                            <p><strong>آخر تحديث:</strong> ديسمبر 2025</p>

                            <h2>قبول الشروط</h2>
                            <p>
                                باستخدام هذا الموقع، فإنك توافق على الالتزام بشروط الاستخدام هذه.
                            </p>

                            <h2>استخدام المحتوى</h2>
                            <p>
                                المحتوى المقدم في هذا الموقع هو لأغراض إعلامية فقط. جميع الحقوق محفوظة لمدونة التقنية.
                            </p>

                            <h2>حقوق الملكية الفكرية</h2>
                            <p>
                                جميع المحتويات والمواد المتاحة على هذا الموقع محمية بموجب قوانين حقوق النشر.
                            </p>

                            <h2>إخلاء المسؤولية</h2>
                            <p>
                                نحن نبذل قصارى جهدنا لضمان دقة المعلومات، لكننا لا نتحمل المسؤولية عن أي أخطاء أو سهو.
                            </p>

                            <h2>التعديلات</h2>
                            <p>
                                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. يرجى مراجعة هذه الصفحة بانتظام.
                            </p>

                            <h2>تواصل معنا</h2>
                            <p>للأسئلة حول شروط الاستخدام، يرجى الاتصال بنا عبر: info@techissues.com</p>
                        </>
                    ) : (
                        <>
                            <p><strong>Last Updated:</strong> December 2025</p>

                            <h2>Acceptance of Terms</h2>
                            <p>
                                By using this website, you agree to comply with these Terms of Use.
                            </p>

                            <h2>Use of Content</h2>
                            <p>
                                Content provided on this site is for informational purposes only. All rights reserved by Tech Blog.
                            </p>

                            <h2>Intellectual Property Rights</h2>
                            <p>
                                All content and materials available on this site are protected under copyright laws.
                            </p>

                            <h2>Disclaimer</h2>
                            <p>
                                We make every effort to ensure accuracy of information, but we are not responsible for any errors or omissions.
                            </p>

                            <h2>Modifications</h2>
                            <p>
                                We reserve the right to modify these terms at any time. Please review this page regularly.
                            </p>

                            <h2>Contact Us</h2>
                            <p>For questions about these terms, please contact us at: info@techissues.com</p>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
