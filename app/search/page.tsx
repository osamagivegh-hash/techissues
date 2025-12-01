import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';

export const metadata: Metadata = {
    title: 'البحث - مدونة التقنية',
    description: 'ابحث في جميع مقالات مدونة التقنية',
};

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
    }>;
}

async function searchPosts(query: string) {
    if (!query || query.trim().length === 0) {
        return [];
    }

    await dbConnect();

    const posts = await Post.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { excerpt: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
        ],
        status: 'published',
    })
        .populate('category')
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();

    return JSON.parse(JSON.stringify(posts));
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const query = q || '';
    const posts = query ? await searchPosts(query) : [];

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                {/* Search Header */}
                <section className="bg-white border-b py-12">
                    <div className="container-custom">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">البحث</h1>

                        {/* Search Form */}
                        <form method="get" action="/search" className="max-w-2xl">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="q"
                                    defaultValue={query}
                                    placeholder="ابحث عن مقالات..."
                                    className="input pr-12"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Search Results */}
                <section className="py-12">
                    <div className="container-custom">
                        {query ? (
                            <>
                                <p className="text-gray-600 mb-8">
                                    {posts.length > 0
                                        ? `تم العثور على ${posts.length} نتيجة للبحث عن "${query}"`
                                        : `لم يتم العثور على نتائج للبحث عن "${query}"`}
                                </p>

                                {posts.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {posts.map((post: any) => (
                                            <PostCard key={post._id} post={post} />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <svg
                                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <p className="text-gray-500 text-lg">
                                    أدخل كلمة البحث للعثور على المقالات
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
