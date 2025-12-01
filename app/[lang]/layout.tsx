import { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { Language, getLanguageDirection, t } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../globals.css';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: lang === 'ar' ? 'مدونة التقنية - برمجة ومشاكل تقنية ومراجعات أجهزة' : 'Tech Blog - Programming, Tech Issues & Device Reviews',
        description: lang === 'ar'
            ? 'مدونة تقنية متخصصة في البرمجة وحل المشاكل التقنية ومراجعات الأجهزة'
            : 'A tech blog specialized in programming, solving technical issues, and device reviews',
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
    params: Promise<{ lang: Language }>;
}) {
    const { lang } = await params;
    const dir = getLanguageDirection(lang);

    return (
        <html lang={lang} dir={dir}>
            <body className={cairo.className}>
                <Header lang={lang} />
                {children}
                <Footer lang={lang} />
            </body>
        </html>
    );
}
