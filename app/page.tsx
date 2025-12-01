import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import Category from '@/models/Category';

async function getHomeData() {
    await dbConnect();

    // Get categories
    const categories = await Category.find({}).lean();

    // Get latest posts for each category
    const programmingCategory = categories.find((c) => c.slug === 'programming');
    const techIssuesCategory = categories.find((c) => c.slug === 'tech-issues');
    const deviceReviewsCategory = categories.find((c) => c.slug === 'device-reviews');

    const [programmingPosts, techIssuesPosts, deviceReviewsPosts] = await Promise.all([
        Post.find({ category: programmingCategory?._id, status: 'published' })
            .populate('category')
            .sort({ createdAt: -1 })
            .limit(3)
            .lean(),
        Post.find({ category: techIssuesCategory?._id, status: 'published' })
            .populate('category')
            .sort({ createdAt: -1 })
            .limit(3)
            .lean(),
        Post.find({ category: deviceReviewsCategory?._id, status: 'published' })
            .populate('category')
            .sort({ createdAt: -1 })
            .limit(3)
            .lean(),
    ]);

    return {
        programmingPosts: JSON.parse(JSON.stringify(programmingPosts)),
        techIssuesPosts: JSON.parse(JSON.stringify(techIssuesPosts)),
        deviceReviewsPosts: JSON.parse(JSON.stringify(deviceReviewsPosts)),
    };
}

export default async function HomePage() {
    const { programmingPosts, techIssuesPosts, deviceReviewsPosts } = await getHomeData();

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                    <div className="container-custom text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            مرحباً بك في مدونة التقنية
                        </h1>
                        <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                            موقعك الأول للحصول على حلول البرمجة، حل المشاكل التقنية، ومراجعات شاملة
                            للأجهزة
                        </p>
                    </div>
                </section>

                {/* Programming Section */}
                <section className="py-16">
                    <div className="container-custom">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">البرمجة</h2>
                            <Link
                                href="/category/programming"
                                className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
                            >
                                عرض الكل
                                <svg
                                    className="w-5 h-5 rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {programmingPosts.length > 0 ? (
                                programmingPosts.map((post: any) => (
                                    <PostCard key={post._id} post={post} />
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full text-center py-8">
                                    لا توجد مقالات حالياً
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Tech Issues Section */}
                <section className="py-16 bg-white">
                    <div className="container-custom">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">المشاكل التقنية</h2>
                            <Link
                                href="/category/tech-issues"
                                className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
                            >
                                عرض الكل
                                <svg
                                    className="w-5 h-5 rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {techIssuesPosts.length > 0 ? (
                                techIssuesPosts.map((post: any) => (
                                    <PostCard key={post._id} post={post} />
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full text-center py-8">
                                    لا توجد مقالات حالياً
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Device Reviews Section */}
                <section className="py-16">
                    <div className="container-custom">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">مراجعات الأجهزة</h2>
                            <Link
                                href="/category/device-reviews"
                                className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
                            >
                                عرض الكل
                                <svg
                                    className="w-5 h-5 rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {deviceReviewsPosts.length > 0 ? (
                                deviceReviewsPosts.map((post: any) => (
                                    <PostCard key={post._id} post={post} />
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full text-center py-8">
                                    لا توجد مقالات حالياً
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
