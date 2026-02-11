import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'التقنية والحياة - برمجة، صحة نفسية، وغذاء',
    description: 'موقع شامل يجمع بين التقنية، البرمجة، الصحة النفسية، فوائد الغذاء والرياضة',
    keywords: ['برمجة', 'تقنية', 'مراجعات', 'صحة نفسية', 'رياضة', 'تغذية', 'ويندوز', 'هواتف'],
    authors: [{ name: 'Technology and Life' }],
    openGraph: {
        title: 'التقنية والحياة - برمجة، صحة نفسية، وغذاء',
        description: 'موقع شامل يجمع بين التقنية، البرمجة، الصحة النفسية، فوائد الغذاء والرياضة',
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

