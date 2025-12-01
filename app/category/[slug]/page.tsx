import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import Category from '@/models/Category';

const POSTS_PER_PAGE = 9;

const categoryNames: Record<string, string> = {
    programming: 'البرمجة',
    'tech-issues': 'المشاكل التقنية',
    'device-reviews': 'مراجعات الأجهزة',
};

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{
        page?: string;
    }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const categoryName = categoryNames[slug] || slug;

    return {
        title: `${categoryName} - مدونة التقنية`,
        description: `تصفح جميع مقالات ${categoryName} على مدونة التقنية`,
    };
}

async function getCategoryData(slug: string, page: number) {
    await dbConnect();

    const category = await Category.findOne({ slug }).lean();

    if (!category) {
        return null;
    }

    const skip = (page - 1) * POSTS_PER_PAGE;

    const [posts, totalPosts] = await Promise.all([
        Post.find({ category: category._id, status: 'published' })
            .populate('category')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(POSTS_PER_PAGE)
            .lean(),
        Post.countDocuments({ category: category._id, status: 'published' }),
    ]);

    return {
        category: JSON.parse(JSON.stringify(category)),
        posts: JSON.parse(JSON.stringify(posts)),
        totalPages: Math.ceil(totalPosts / POSTS_PER_PAGE),
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { slug } = await params;
    const { page: pageParam } = await searchParams;
    const page = parseInt(pageParam || '1', 10);
    const data = await getCategoryData(slug, page);

    if (!data) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-gray-50 py-16">
                    <div className="container-custom text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">القسم غير موجود</h1>
                        <p className="text-gray-600">عذراً، القسم المطلوب غير متوفر.</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const { category, posts, totalPages } = data;
    const categoryName = categoryNames[slug] || category.name;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                {/* Page Header */}
                <section className="bg-white border-b py-12">
                    <div className="container-custom">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{categoryName}</h1>
                        <p className="text-gray-600">
                            تصفح جميع المقالات في قسم {categoryName}
                        </p>
                    </div>
                </section>

                {/* Posts Grid */}
                <section className="py-12">
                    <div className="container-custom">
                        {posts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {posts.map((post: any) => (
                                        <PostCard key={post._id} post={post} />
                                    ))}
                                </div>
                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    baseUrl={`/category/${slug}`}
                                />
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-lg">لا توجد مقالات في هذا القسم حالياً</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
