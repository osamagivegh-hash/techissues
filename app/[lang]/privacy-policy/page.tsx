import { Metadata } from 'next';
import { Language } from '@/lib/i18n';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';

interface PrivacyPageProps {
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

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
    const { lang } = await params;
    const page = await getPageContent('privacy-policy');

    const title = page
        ? (lang === 'ar' ? page.titleAr : page.titleEn)
        : (lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy');

    return {
        title: `${title} - ${lang === 'ar' ? 'التقنية والحياة' : 'Technology and Life'}`,
    };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
    const { lang } = await params;
    const page = await getPageContent('privacy-policy');

    const title = page
        ? (lang === 'ar' ? page.titleAr : page.titleEn)
        : (lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy');

    const content = page
        ? (lang === 'ar' ? page.contentAr : page.contentEn)
        : (lang === 'ar'
            ? '<p>سياسة الخصوصية قيد التحديث.</p>'
            : '<p>Privacy policy is being updated.</p>');

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container-custom py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    {title}
                </h1>

                <div
                    className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none"
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </main>
    );
}
