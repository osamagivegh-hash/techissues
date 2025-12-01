import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import Category from '@/models/Category';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { Language, t, categorySlugs } from '@/lib/i18n';

const POSTS_PER_PAGE = 9;

interface CategoryPageProps {
    params: Promise<{ lang: Language; slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { lang, slug } = await params;
    const categoryName = categorySlugs[slug as keyof typeof categorySlugs]?.[lang] || slug;

    return {
        title: `${categoryName} - ${lang === 'ar' ? 'مدونة التقنية' : 'Tech Blog'}`,
        description: lang === 'ar'
            ? `تصفح جميع مقالات ${categoryName}`
            : `Browse all ${categoryName} articles`,
    };
}

async function getCategoryData(lang: Language, slug: string, page: number) {
    try {
        await dbConnect();

        const category = await Category.findOne({ slug, language: lang }).lean();

        if (!category) {
            return null;
        }

        const skip = (page - 1) * POSTS_PER_PAGE;

        const [posts, totalCount] = await Promise.all([
            Post.find({
                language: lang,
                category: category._id,
                status: 'published',
            })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(POSTS_PER_PAGE)
                .populate('category')
                .lean(),

            Post.countDocuments({
                language: lang,
                category: category._id,
                status: 'published',
            }),
        ]);

        const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

        return {
            category: JSON.parse(JSON.stringify(category)),
            posts: JSON.parse(JSON.stringify(posts)),
            totalPages,
            totalCount,
        };
    } catch (error) {
        console.error('Error fetching category data:', error);
        return null;
    }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { lang, slug } = await params;
    const { page: pageParam } = await searchParams;
    const page = parseInt(pageParam || '1', 10);

    const data = await getCategoryData(lang, slug, page);

    if (!data) {
        notFound();
    }

    const { category, posts, totalPages, totalCount } = data;
    const categoryName = categorySlugs[slug as keyof typeof categorySlugs]?.[lang] || category.name;

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
                <div className="container-custom">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{categoryName}</h1>
                    <p className="text-xl text-primary-100">
                        {totalCount} {lang === 'ar' ? 'مقالة' : 'articles'}
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-16">
                <div className="container-custom">
                    {posts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {posts.map((post: any) => (
                                    <PostCard key={post._id} post={post} lang={lang} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    baseUrl={`/${lang}/category/${slug}`}
                                />
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg mb-4">{t(lang, 'noPosts')}</p>
                            <Link href={`/${lang}`} className="text-primary-600 hover:text-primary-700 font-medium">
                                {t(lang, 'backToHome')}
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
