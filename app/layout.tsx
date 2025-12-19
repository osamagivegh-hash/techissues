import type { Metadata } from 'next';
import './globals.css';

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
    // Note: html and body tags are rendered in [lang]/layout.tsx
    // This layout just passes children through
    return children;
}

