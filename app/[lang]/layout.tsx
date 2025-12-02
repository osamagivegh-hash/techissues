import { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { Language, getLanguageDirection, isValidLanguage } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../globals.css';
import { notFound } from 'next/navigation';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: lang === 'ar' ? 'مدونة التقنية - برمجة ومشاكل تقنية ومراجعات أجهزة' : 'Tech Blog - Programming, Tech Issues & Device Reviews',
        description: lang === 'ar'
            ? 'مدونة تقنية متخصصة في البرمجة وحل المشاكل التقنية ومراجعات الأجهزة'
            : 'A tech blog specialized in programming, solving technical issues, and device reviews',
        viewport: {
            width: 'device-width',
            initialScale: 1,
            maximumScale: 5,
        },
        openGraph: {
            title: lang === 'ar' ? 'مدونة التقنية' : 'Tech Blog',
            description: lang === 'ar'
                ? 'مدونة تقنية متخصصة في البرمجة وحل المشاكل التقنية ومراجعات الأجهزة'
                : 'A tech blog specialized in programming, solving technical issues, and device reviews',
            type: 'website',
            locale: lang === 'ar' ? 'ar_SA' : 'en_US',
        },
    };
}

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    // Validate language
    if (!isValidLanguage(lang)) {
        notFound();
    }

    const validLang = lang as Language;
    const dir = getLanguageDirection(validLang);

    return (
        <html lang={validLang} dir={dir}>
            <body className={cairo.className}>
                <Header lang={validLang} />
                {children}
                <Footer lang={validLang} />
            </body>
        </html>
    );
}
