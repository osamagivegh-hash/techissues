import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'من نحن - مدونة التقنية',
    description: 'تعرف على مدونة التقنية ورسالتنا في تقديم محتوى تقني عربي عالي الجودة',
};

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                <div className="container-custom py-16">
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">من نحن</h1>

                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                            <p>
                                مرحباً بكم في <strong>مدونة التقنية</strong>، وجهتكم الأولى للحصول على محتوى
                                تقني عربي عالي الجودة.
                            </p>

                            <p>
                                نحن فريق من المتخصصين في مجال التقنية والبرمجة، نسعى لتقديم محتوى مفيد وشامل
                                يساعد القراء العرب على حل مشاكلهم التقنية، تعلم البرمجة، واتخاذ قرارات مستنيرة
                                عند شراء الأجهزة الإلكترونية.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">رسالتنا</h2>
                            <p>
                                نؤمن بأن المعرفة التقنية يجب أن تكون متاحة للجميع بلغتهم الأم. لذلك، نعمل على
                                تقديم محتوى تقني باللغة العربية يتميز بالوضوح والدقة والفائدة العملية.
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">ما نقدمه</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    <strong>حلول البرمجة:</strong> دروس ومقالات تعليمية في مختلف لغات البرمجة
                                    وأطر العمل
                                </li>
                                <li>
                                    <strong>المشاكل التقنية:</strong> حلول عملية لمشاكل الويندوز، الهواتف،
                                    الشبكات، وغيرها
                                </li>
                                <li>
                                    <strong>مراجعات الأجهزة:</strong> مراجعات شاملة ونزيهة للهواتف، الحواسيب،
                                    والأجهزة الإلكترونية
                                </li>
                            </ul>

                            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">تواصل معنا</h2>
                            <p>
                                نحن دائماً سعداء بسماع آرائكم واقتراحاتكم. لا تترددوا في{' '}
                                <a href="/contact" className="text-primary-600 hover:text-primary-700 underline">
                                    التواصل معنا
                                </a>{' '}
                                في أي وقت.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
