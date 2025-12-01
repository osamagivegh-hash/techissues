import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'سياسة الخصوصية - مدونة التقنية',
    description: 'سياسة الخصوصية وحماية البيانات في مدونة التقنية',
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                <div className="container-custom py-16">
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">سياسة الخصوصية</h1>

                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                            <p className="text-sm text-gray-500">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>

                            <p>
                                نحن في <strong>مدونة التقنية</strong> نحترم خصوصيتك ونلتزم بحماية بياناتك
                                الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">المعلومات التي نجمعها</h2>
                            <p>قد نجمع الأنواع التالية من المعلومات:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>معلومات الاتصال (الاسم، البريد الإلكتروني) عند التواصل معنا</li>
                                <li>بيانات الاستخدام (الصفحات المزارة، الوقت المستغرق)</li>
                                <li>معلومات تقنية (عنوان IP، نوع المتصفح)</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">كيف نستخدم المعلومات</h2>
                            <p>نستخدم المعلومات المجمعة للأغراض التالية:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>تحسين تجربة المستخدم على الموقع</li>
                                <li>الرد على استفساراتكم وطلباتكم</li>
                                <li>تحليل استخدام الموقع وتحسين المحتوى</li>
                                <li>إرسال تحديثات ومعلومات مهمة (بموافقتكم)</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">ملفات تعريف الارتباط (Cookies)</h2>
                            <p>
                                نستخدم ملفات تعريف الارتباط لتحسين تجربتك على الموقع. يمكنك تعطيل ملفات تعريف
                                الارتباط من إعدادات المتصفح، لكن قد يؤثر ذلك على بعض وظائف الموقع.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">مشاركة المعلومات</h2>
                            <p>
                                نحن لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>بموافقتك الصريحة</li>
                                <li>للامتثال للقوانين والأنظمة</li>
                                <li>لحماية حقوقنا وسلامة المستخدمين</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Google AdSense</h2>
                            <p>
                                نستخدم Google AdSense لعرض الإعلانات على الموقع. قد تستخدم Google ملفات تعريف
                                الارتباط لعرض إعلانات مخصصة بناءً على اهتماماتك. يمكنك معرفة المزيد عن سياسة
                                خصوصية Google وكيفية إلغاء الاشتراك في الإعلانات المخصصة من خلال{' '}
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-600 hover:text-primary-700 underline"
                                >
                                    سياسة خصوصية Google
                                </a>
                                .
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">حقوقك</h2>
                            <p>لديك الحق في:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>الوصول إلى بياناتك الشخصية</li>
                                <li>تصحيح أو تحديث بياناتك</li>
                                <li>طلب حذف بياناتك</li>
                                <li>الاعتراض على معالجة بياناتك</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">التواصل معنا</h2>
                            <p>
                                إذا كان لديك أي أسئلة حول سياسة الخصوصية، يمكنك{' '}
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
