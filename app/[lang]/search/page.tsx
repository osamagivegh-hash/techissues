import { Metadata } from 'next';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import PostCard from '@/components/PostCard';
import { Language, t } from '@/lib/i18n';

interface SearchPageProps {
    params: Promise<{ lang: Language }>;
    searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: `${t(lang, 'search')} - ${lang === 'ar' ? 'مدونة التقنية' : 'Tech Blog'}`,
        description: lang === 'ar'
            ? 'ابحث عن مقالات في البرمجة والمشاكل التقنية ومراجعات الأجهزة'
            : 'Search for articles in programming, tech issues, and device reviews',
    };
}

async function searchPosts(lang: Language, query: string) {
    if (!query) return [];

    try {
        await dbConnect();

        const posts = await Post.find({
            language: lang,
            status: 'published',
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { excerpt: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
                { tags: { $in: [new RegExp(query, 'i')] } },
            ],
        })
            .sort({ createdAt: -1 })
            .limit(20)
            .populate('category')
            .lean();

        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
    const { lang } = await params;
    const { q } = await searchParams;
    const query = q || '';
    const posts = query ? await searchPosts(lang, query) : [];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
                <div className="container-custom">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{t(lang, 'search')}</h1>

                    {/* Search Form */}
                    <form method="GET" className="max-w-2xl">
                        <div className="relative">
                            <input
                                type="text"
                                name="q"
                                defaultValue={query}
                                placeholder={t(lang, 'searchPlaceholder')}
                                className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                {lang === 'ar' ? 'بحث' : 'Search'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Results */}
            <section className="py-16">
                <div className="container-custom">
                    {query ? (
                        <>
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {lang === 'ar' ? 'نتائج البحث عن' : 'Search results for'}: "{query}"
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    {posts.length} {lang === 'ar' ? 'نتيجة' : 'result(s)'}
                                </p>
                            </div>

                            {posts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {posts.map((post: any) => (
                                        <PostCard key={post._id} post={post} lang={lang} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg
                                        className="w-24 h-24 mx-auto text-gray-400 mb-4"
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
                                    <p className="text-xl text-gray-600">{t(lang, 'noResults')}</p>
                                    <p className="text-gray-500 mt-2">
                                        {lang === 'ar'
                                            ? 'حاول استخدام كلمات مختلفة أو أقل تحديداً'
                                            : 'Try using different or less specific keywords'}
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <svg
                                className="w-24 h-24 mx-auto text-gray-400 mb-4"
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
                            <p className="text-xl text-gray-600">
                                {lang === 'ar'
                                    ? 'ابدأ بكتابة كلمة للبحث'
                                    : 'Start typing to search'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
