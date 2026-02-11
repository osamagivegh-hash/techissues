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
        title: lang === 'ar' ? 'التقنية والحياة - برمجة، صحة نفسية، وغذاء' : 'Technology and Life - Tech, Psychology, & Health',
        description: lang === 'ar'
            ? 'مدونة التقنية والحياة: كل ما يهمك في عالم البرمجة، المشاكل التقنية، مراجعات الأجهزة، بالإضافة إلى الجوانب النفسية وفوائد الغذاء والرياضة.'
            : 'Technology and Life Blog: Everything about programming, tech issues, device reviews, plus psychological aspects, food benefits, and sports.',
        viewport: {
            width: 'device-width',
            initialScale: 1,
            maximumScale: 5,
        },
        openGraph: {
            title: lang === 'ar' ? 'التقنية والحياة' : 'Technology and Life',
            description: lang === 'ar'
                ? 'مدونة التقنية والحياة: كل ما يهمك في عالم البرمجة، المشاكل التقنية، مراجعات الأجهزة، بالإضافة إلى الجوانب النفسية وفوائد الغذاء والرياضة.'
                : 'Technology and Life Blog: Everything about programming, tech issues, device reviews, plus psychological aspects, food benefits, and sports.',
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
            <head>
                {/* Google AdSense Verification Script */}
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8268189449649056"
                    crossOrigin="anonymous"
                />
            </head>
            <body className={`${cairo.className} antialiased`}>
                <Header lang={validLang} />
                {children}
                <Footer lang={validLang} />
            </body>
        </html>
    );
}
