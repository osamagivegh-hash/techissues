import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'اتصل بنا - مدونة التقنية',
    description: 'تواصل مع فريق مدونة التقنية',
};

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                <div className="container-custom py-16">
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">اتصل بنا</h1>

                        <p className="text-gray-700 mb-8">
                            نحن سعداء بسماع آرائكم واقتراحاتكم. يمكنكم التواصل معنا عبر النموذج أدناه أو
                            عبر البريد الإلكتروني.
                        </p>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    الاسم
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="input"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="input"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    الموضوع
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="input"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    الرسالة
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    className="textarea"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-full">
                                إرسال الرسالة
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">معلومات الاتصال</h2>
                            <div className="space-y-2 text-gray-700">
                                <p>
                                    <strong>البريد الإلكتروني:</strong> info@techissues.com
                                </p>
                                <p>
                                    <strong>ساعات العمل:</strong> من الأحد إلى الخميس، 9 صباحاً - 5 مساءً
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
