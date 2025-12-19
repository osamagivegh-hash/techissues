import { Metadata } from 'next';
import { Language } from '@/lib/i18n';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import ContactForm from '@/components/ContactForm';

interface ContactPageProps {
    params: Promise<{ lang: Language }>;
}

async function getPageContent(slug: string) {
    try {
        await dbConnect();
        const page = await Page.findOne({ slug, isActive: true }).lean();
        return page ? JSON.parse(JSON.stringify(page)) : null;
    } catch (error) {
        console.error('Error fetching page:', error);
        return null;
    }
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: `${lang === 'ar' ? 'اتصل بنا' : 'Contact Us'} - ${lang === 'ar' ? 'مدونة التقنية' : 'Tech Blog'}`,
        description: lang === 'ar'
            ? 'تواصل معنا لأي استفسارات أو اقتراحات. نحن نقدر تعليقاتكم!'
            : 'Contact us for any inquiries or suggestions. We value your feedback!',
    };
}

export default async function ContactPage({ params }: ContactPageProps) {
    const { lang } = await params;
    const isArabic = lang === 'ar';
    const page = await getPageContent('contact-info');

    const contactInfoContent = page
        ? (isArabic ? page.contentAr : page.contentEn)
        : null;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container-custom py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {isArabic ? 'اتصل بنا' : 'Contact Us'}
                </h1>
                <p className="text-gray-600 mb-8 text-lg">
                    {isArabic
                        ? 'نحن نرحب بتعليقاتكم واستفساراتكم. يرجى ملء النموذج أدناه وسنتواصل معكم في أقرب وقت ممكن.'
                        : 'We welcome your feedback and inquiries. Please fill out the form below and we will get back to you as soon as possible.'}
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="md:col-span-2 bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {isArabic ? 'أرسل رسالة' : 'Send a Message'}
                        </h2>
                        <ContactForm lang={lang} />
                    </div>

                    {/* Contact Information from Database */}
                    <div className="space-y-6">
                        {contactInfoContent && (
                            <div
                                className="bg-white rounded-lg shadow-md p-6 prose prose-sm max-w-none"
                                dir={isArabic ? 'rtl' : 'ltr'}
                                dangerouslySetInnerHTML={{ __html: contactInfoContent }}
                            />
                        )}

                        {!contactInfoContent && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="font-bold text-xl mb-4 text-gray-900">
                                    {isArabic ? 'معلومات الاتصال' : 'Contact Information'}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-blue-600 text-xl">📧</span>
                                        <div>
                                            <p className="font-medium text-gray-700">
                                                {isArabic ? 'البريد الإلكتروني' : 'Email'}
                                            </p>
                                            <a href="mailto:info@techiss.store" className="text-blue-600 hover:underline">
                                                info@techiss.store
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-blue-600 text-xl">🌐</span>
                                        <div>
                                            <p className="font-medium text-gray-700">
                                                {isArabic ? 'الموقع الإلكتروني' : 'Website'}
                                            </p>
                                            <a href="https://techiss.store" className="text-blue-600 hover:underline">
                                                techiss.store
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                            <h3 className="font-bold text-lg mb-3 text-blue-900">
                                {isArabic ? 'ساعات العمل' : 'Working Hours'}
                            </h3>
                            <p className="text-blue-800">
                                {isArabic
                                    ? 'نرد على الرسائل خلال 24-48 ساعة في أيام العمل.'
                                    : 'We respond to messages within 24-48 hours on business days.'}
                            </p>
                        </div>

                        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                            <h3 className="font-bold text-lg mb-3 text-green-900">
                                {isArabic ? 'نصيحة' : 'Tip'}
                            </h3>
                            <p className="text-green-800">
                                {isArabic
                                    ? 'يرجى وصف استفسارك بالتفصيل حتى نتمكن من مساعدتك بشكل أفضل.'
                                    : 'Please describe your inquiry in detail so we can help you better.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
