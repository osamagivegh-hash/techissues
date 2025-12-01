import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
    subsets: ['arabic', 'latin'],
    variable: '--font-cairo',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'مدونة التقنية - حلول البرمجة والمشاكل التقنية',
    description: 'موقع متخصص في حلول البرمجة، المشاكل التقنية، ومراجعات الأجهزة',
    keywords: ['برمجة', 'تقنية', 'مراجعات', 'حلول تقنية', 'ويندوز', 'هواتف'],
    authors: [{ name: 'Tech Issues Blog' }],
    openGraph: {
        title: 'مدونة التقنية - حلول البرمجة والمشاكل التقنية',
        description: 'موقع متخصص في حلول البرمجة، المشاكل التقنية، ومراجعات الأجهزة',
        type: 'website',
        locale: 'ar_SA',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl" className={cairo.variable}>
            <body className={`${cairo.className} antialiased`}>{children}</body>
        </html>
    );
}
