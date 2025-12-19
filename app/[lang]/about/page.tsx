import { Metadata } from 'next';
import { Language } from '@/lib/i18n';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';

interface AboutPageProps {
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

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
    const { lang } = await params;
    const page = await getPageContent('about');

    const title = page
        ? (lang === 'ar' ? page.titleAr : page.titleEn)
        : (lang === 'ar' ? 'من نحن' : 'About Us');

    return {
        title: `${title} - ${lang === 'ar' ? 'مدونة التقنية' : 'Tech Blog'}`,
        description: lang === 'ar'
            ? 'تعرف على مدونة التقنية ورسالتنا في تقديم محتوى تقني عربي عالي الجودة'
            : 'Learn about Tech Blog and our mission to deliver high-quality tech content',
    };
}

export default async function AboutPage({ params }: AboutPageProps) {
    const { lang } = await params;
    const page = await getPageContent('about');

    const title = page
        ? (lang === 'ar' ? page.titleAr : page.titleEn)
        : (lang === 'ar' ? 'من نحن' : 'About Us');

    const content = page
        ? (lang === 'ar' ? page.contentAr : page.contentEn)
        : (lang === 'ar'
            ? '<p>صفحة من نحن قيد التحديث.</p>'
            : '<p>About page is being updated.</p>');

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
