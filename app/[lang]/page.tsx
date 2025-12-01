import { Metadata } from 'next';
import Link from 'next/link';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import Category from '@/models/Category';
import PostCard from '@/components/PostCard';
import { Language, t } from '@/lib/i18n';

interface HomePageProps {
    params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: lang === 'ar' ? 'مدونة التقنية - الرئيسية' : 'Tech Blog - Home',
        description: lang === 'ar'
            ? 'اكتشف أحدث المقالات في البرمجة والمشاكل التقنية ومراجعات الأجهزة'
            : 'Discover the latest articles in programming, tech issues, and device reviews',
    };
}

async function getHomeData(lang: Language) {
    try {
        await dbConnect();

        // Get categories for this language
        const categories = await Category.find({ language: lang }).lean();

        const categoryMap: { [key: string]: any } = {};
        categories.forEach((cat: any) => {
            categoryMap[cat.slug] = cat;
        });

        // Get latest posts for each category (3 posts per category)
        const [programmingPosts, techIssuesPosts, deviceReviewsPosts] = await Promise.all([
            Post.find({
                language: lang,
                category: categoryMap['programming']?._id,
                status: 'published',
            })
                .sort({ createdAt: -1 })
                .limit(3)
                .populate('category')
                .lean(),

            Post.find({
                language: lang,
                category: categoryMap['tech-issues']?._id,
                status: 'published',
            })
                .sort({ createdAt: -1 })
                .limit(3)
                .populate('category')
                .lean(),

            Post.find({
                language: lang,
                category: categoryMap['device-reviews']?._id,
                status: 'published',
            })
                .sort({ createdAt: -1 })
                .limit(3)
                .populate('category')
                .lean(),
        ]);

        return {
            programmingPosts: JSON.parse(JSON.stringify(programmingPosts)),
            techIssuesPosts: JSON.parse(JSON.stringify(techIssuesPosts)),
            deviceReviewsPosts: JSON.parse(JSON.stringify(deviceReviewsPosts)),
        };
    } catch (error) {
        console.error('Error fetching home data:', error);
        return {
            programmingPosts: [],
            techIssuesPosts: [],
            deviceReviewsPosts: [],
        };
    }
}

export default async function HomePage({ params }: HomePageProps) {
    const { lang } = await params;
    const { programmingPosts, techIssuesPosts, deviceReviewsPosts } = await getHomeData(lang);

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {lang === 'ar'
                                ? 'مرحباً بك في مدونة التقنية'
                                : 'Welcome to Tech Blog'}
                        </h1>
                        <p className="text-xl text-primary-100 mb-8">
                            {lang === 'ar'
                                ? 'اكتشف أحدث المقالات في عالم البرمجة والمشاكل التقنية ومراجعات الأجهزة'
                                : 'Discover the latest articles in programming, tech issues, and device reviews'}
                        </p>
                        <Link
                            href={`/${lang}/search`}
                            className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        >
                            {lang === 'ar' ? 'ابدأ البحث' : 'Start Searching'}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Programming Section */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">{t(lang, 'programming')}</h2>
                        <Link
                            href={`/${lang}/category/programming`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {t(lang, 'viewAll')} →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programmingPosts.length > 0 ? (
                            programmingPosts.map((post: any) => (
                                <PostCard key={post._id} post={post} lang={lang} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-8">{t(lang, 'noPosts')}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Tech Issues Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">{t(lang, 'techIssues')}</h2>
                        <Link
                            href={`/${lang}/category/tech-issues`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {t(lang, 'viewAll')} →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {techIssuesPosts.length > 0 ? (
                            techIssuesPosts.map((post: any) => (
                                <PostCard key={post._id} post={post} lang={lang} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-8">{t(lang, 'noPosts')}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Device Reviews Section */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">{t(lang, 'deviceReviews')}</h2>
                        <Link
                            href={`/${lang}/category/device-reviews`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {t(lang, 'viewAll')} →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deviceReviewsPosts.length > 0 ? (
                            deviceReviewsPosts.map((post: any) => (
                                <PostCard key={post._id} post={post} lang={lang} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-8">{t(lang, 'noPosts')}</p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
