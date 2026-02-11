import { Metadata } from 'next';
import Link from 'next/link';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import Category from '@/models/Category';
import PostCard from '@/components/PostCard';
import { Language, t, isValidLanguage } from '@/lib/i18n';
import { notFound } from 'next/navigation';

interface HomePageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: lang === 'ar' ? 'التقنية والحياة - الرئيسية' : 'Technology and Life - Home',
        description: lang === 'ar'
            ? 'اكتشف أحدث المقالات في البرمجة، المشاكل التقنية، مراجعات الأجهزة، الجوانب النفسية، وفوائد الغذاء والرياضة'
            : 'Discover the latest articles in programming, tech issues, device reviews, psychology, food benefits, and sports',
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
        const [
            programmingPosts,
            techIssuesPosts,
            deviceReviewsPosts,
            psychologyPosts,
            sportsBenefitsPosts,
            foodBenefitsPosts
        ] = await Promise.all([
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

            Post.find({
                language: lang,
                category: categoryMap['psychology']?._id,
                status: 'published',
            })
                .sort({ createdAt: -1 })
                .limit(3)
                .populate('category')
                .lean(),

            Post.find({
                language: lang,
                category: categoryMap['sports-benefits']?._id,
                status: 'published',
            })
                .sort({ createdAt: -1 })
                .limit(3)
                .populate('category')
                .lean(),

            Post.find({
                language: lang,
                category: categoryMap['food-benefits']?._id,
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
            psychologyPosts: JSON.parse(JSON.stringify(psychologyPosts)),
            sportsBenefitsPosts: JSON.parse(JSON.stringify(sportsBenefitsPosts)),
            foodBenefitsPosts: JSON.parse(JSON.stringify(foodBenefitsPosts)),
        };
    } catch (error) {
        console.error('Error fetching home data:', error);
        return {
            programmingPosts: [],
            techIssuesPosts: [],
            deviceReviewsPosts: [],
            psychologyPosts: [],
            sportsBenefitsPosts: [],
            foodBenefitsPosts: [],
        };
    }
}

export default async function HomePage({ params }: HomePageProps) {
    const { lang } = await params;

    // Validate language
    if (!isValidLanguage(lang)) {
        notFound();
    }

    const validLang = lang as Language;
    const {
        programmingPosts,
        techIssuesPosts,
        deviceReviewsPosts,
        psychologyPosts,
        sportsBenefitsPosts,
        foodBenefitsPosts
    } = await getHomeData(validLang);

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {validLang === 'ar'
                                ? 'مرحباً بك في التقنية والحياة'
                                : 'Welcome to Technology and Life'}
                        </h1>
                        <p className="text-xl text-primary-100 mb-8">
                            {validLang === 'ar'
                                ? 'اكتشف التقنية، الصحة النفسية، وفوائد الغذاء والرياضة في مكان واحد'
                                : 'Discover technology, mental health, food benefits, and sports in one place'}
                        </p>
                        <Link
                            href={`/${validLang}/search`}
                            className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        >
                            {validLang === 'ar' ? 'ابدأ البحث' : 'Start Searching'}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Programming Section */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">{t(validLang, 'programming')}</h2>
                        <Link
                            href={`/${validLang}/category/programming`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {t(validLang, 'viewAll')} →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programmingPosts.length > 0 ? (
                            programmingPosts.map((post: any) => (
                                <PostCard key={post._id} post={post} lang={validLang} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-8">{t(validLang, 'noPosts')}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Tech Issues Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">{t(validLang, 'techIssues')}</h2>
                        <Link
                            href={`/${validLang}/category/tech-issues`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {t(validLang, 'viewAll')} →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {techIssuesPosts.length > 0 ? (
                            techIssuesPosts.map((post: any) => (
                                <PostCard key={post._id} post={post} lang={validLang} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-8">{t(validLang, 'noPosts')}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Psychology Section */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">{t(validLang, 'psychology')}</h2>
                        <Link
                            href={`/${validLang}/category/psychology`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {t(validLang, 'viewAll')} →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {psychologyPosts.length > 0 ? (
                            psychologyPosts.map((post: any) => (
                                <PostCard key={post._id} post={post} lang={validLang} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-8">{t(validLang, 'noPosts')}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Device Reviews Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">{t(validLang, 'deviceReviews')}</h2>
                        <Link
                            href={`/${validLang}/category/device-reviews`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {t(validLang, 'viewAll')} →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deviceReviewsPosts.length > 0 ? (
                            deviceReviewsPosts.map((post: any) => (
                                <PostCard key={post._id} post={post} lang={validLang} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-8">{t(validLang, 'noPosts')}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Sports Benefits Section */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">{t(validLang, 'sportsBenefits')}</h2>
                        <Link
                            href={`/${validLang}/category/sports-benefits`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {t(validLang, 'viewAll')} →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sportsBenefitsPosts.length > 0 ? (
                            sportsBenefitsPosts.map((post: any) => (
                                <PostCard key={post._id} post={post} lang={validLang} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-8">{t(validLang, 'noPosts')}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Food Benefits Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">{t(validLang, 'foodBenefits')}</h2>
                        <Link
                            href={`/${validLang}/category/food-benefits`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {t(validLang, 'viewAll')} →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {foodBenefitsPosts.length > 0 ? (
                            foodBenefitsPosts.map((post: any) => (
                                <PostCard key={post._id} post={post} lang={validLang} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-8">{t(validLang, 'noPosts')}</p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
