import { Metadata } from 'next';
import { Language } from '@/lib/i18n';

interface ContactPageProps {
    params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: `${lang === 'ar' ? 'اتصل بنا' : 'Contact Us'} - ${lang === 'ar' ? 'مدونة التقنية' : 'Tech Blog'}`,
    };
}

export default async function ContactPage({ params }: ContactPageProps) {
    const { lang } = await params;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container-custom py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </h1>

                <div className="max-w-2xl bg-white rounded-lg shadow-md p-8">
                    <p className="text-gray-600 mb-6">
                        {lang === 'ar'
                            ? 'نحن نرحب بتعليقاتكم واستفساراتكم. يرجى ملء النموذج أدناه.'
                            : 'We welcome your feedback and inquiries. Please fill out the form below.'}
                    </p>

                    <p className="text-center text-gray-500 py-8">
                        {lang === 'ar'
                            ? 'نموذج الاتصال قيد التطوير'
                            : 'Contact form under development'}
                    </p>

                    <div className="mt-8 pt-8 border-t">
                        <h3 className="font-bold text-xl mb-4">
                            {lang === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                        </h3>
                        <p className="text-gray-600">
                            <strong>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}:</strong> info@techissues.com
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
