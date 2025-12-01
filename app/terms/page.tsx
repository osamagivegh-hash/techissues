import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'شروط الاستخدام - مدونة التقنية',
    description: 'شروط وأحكام استخدام مدونة التقنية',
};

export default function TermsPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                <div className="container-custom py-16">
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">شروط الاستخدام</h1>

                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                            <p className="text-sm text-gray-500">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>

                            <p>
                                مرحباً بك في <strong>مدونة التقنية</strong>. باستخدامك لهذا الموقع، فإنك توافق
                                على الالتزام بالشروط والأحكام التالية.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">استخدام الموقع</h2>
                            <p>يمكنك استخدام هذا الموقع للأغراض الشخصية والتعليمية. يُحظر عليك:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>استخدام الموقع لأي غرض غير قانوني</li>
                                <li>نسخ أو إعادة نشر المحتوى دون إذن كتابي</li>
                                <li>محاولة اختراق أو تعطيل الموقع</li>
                                <li>جمع بيانات المستخدمين الآخرين</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">حقوق الملكية الفكرية</h2>
                            <p>
                                جميع المحتويات المنشورة على هذا الموقع، بما في ذلك النصوص والصور والرسومات
                                والشعارات، هي ملك لـ <strong>مدونة التقنية</strong> أو مرخصة لنا، ومحمية
                                بموجب قوانين حقوق النشر والملكية الفكرية.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">المحتوى المقدم من المستخدمين</h2>
                            <p>
                                إذا قمت بإرسال أي محتوى إلى الموقع (مثل التعليقات أو الاقتراحات)، فإنك تمنحنا
                                حقاً غير حصري لاستخدام ونشر وتعديل هذا المحتوى.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">إخلاء المسؤولية</h2>
                            <p>
                                المعلومات المقدمة على هذا الموقع هي لأغراض تعليمية وإعلامية فقط. نحن نبذل قصارى
                                جهدنا لضمان دقة المعلومات، لكننا لا نضمن:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>دقة أو اكتمال المعلومات</li>
                                <li>ملاءمة المعلومات لأغراض معينة</li>
                                <li>عدم انقطاع أو خلو الموقع من الأخطاء</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">الروابط الخارجية</h2>
                            <p>
                                قد يحتوي الموقع على روابط لمواقع خارجية. نحن لسنا مسؤولين عن محتوى أو سياسات
                                الخصوصية لهذه المواقع.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">الإعلانات</h2>
                            <p>
                                نستخدم Google AdSense لعرض الإعلانات على الموقع. المعلنون مسؤولون عن محتوى
                                إعلاناتهم، ونحن لا نتحمل مسؤولية عن أي منتجات أو خدمات معلن عنها.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">التعديلات على الشروط</h2>
                            <p>
                                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة،
                                ويُعتبر استمرارك في استخدام الموقع بمثابة موافقة على الشروط المعدلة.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">القانون الواجب التطبيق</h2>
                            <p>
                                تخضع هذه الشروط وتُفسر وفقاً لقوانين المملكة العربية السعودية.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">التواصل معنا</h2>
                            <p>
                                إذا كان لديك أي أسئلة حول شروط الاستخدام، يمكنك{' '}
                                <a href="/contact" className="text-primary-600 hover:text-primary-700 underline">
                                    التواصل معنا
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
