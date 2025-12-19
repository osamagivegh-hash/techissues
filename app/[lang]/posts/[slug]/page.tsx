import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import PostCard from '@/components/PostCard';
import { formatDate } from '@/lib/utils';
import { Language, t, isValidLanguage } from '@/lib/i18n';
import { sanitizeHtml } from '@/lib/sanitize';

interface PostPageProps {
    params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { lang, slug } = await params;

    try {
        await dbConnect();
        const post = await Post.findOne({ slug, language: lang }).populate('category').lean();

        if (!post) {
            return {
                title: lang === 'ar' ? 'المقال غير موجود' : 'Post Not Found',
            };
        }

        return {
            title: `${post.title} - ${lang === 'ar' ? 'مدونة التقنية' : 'Tech Blog'}`,
            description: post.excerpt,
            openGraph: {
                title: post.title,
                description: post.excerpt,
                images: [post.coverImage],
                type: 'article',
            },
        };
    } catch (error) {
        return {
            title: lang === 'ar' ? 'خطأ' : 'Error',
        };
    }
}

async function getPostData(lang: Language, slug: string) {
    try {
        await dbConnect();

        const post = await Post.findOne({
            slug,
            language: lang,
            status: 'published',
        }).populate('category').lean();

        if (!post) {
            return null;
        }

        // Get related posts from the same category
        const relatedPosts = await Post.find({
            language: lang,
            category: post.category._id,
            status: 'published',
            _id: { $ne: post._id },
        })
            .sort({ createdAt: -1 })
            .limit(3)
            .populate('category')
            .lean();

        return {
            post: JSON.parse(JSON.stringify(post)),
            relatedPosts: JSON.parse(JSON.stringify(relatedPosts)),
        };
    } catch (error) {
        console.error('Error fetching post data:', error);
        return null;
    }
}

export default async function PostPage({ params }: PostPageProps) {
    const { lang, slug } = await params;

    // Validate language
    if (!isValidLanguage(lang)) {
        notFound();
    }

    const validLang = lang as Language;
    const data = await getPostData(validLang, slug);

    if (!data) {
        notFound();
    }

    const { post, relatedPosts } = data;

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Article Header */}
            <article className="bg-white">
                <div className="container-custom py-12">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-sm text-gray-600">
                        <Link href={`/${validLang}`} className="hover:text-primary-600">
                            {t(validLang, 'home')}
                        </Link>
                        <span className="mx-2">→</span>
                        <Link
                            href={`/${validLang}/category/${post.category.slug}`}
                            className="hover:text-primary-600"
                        >
                            {post.category.name}
                        </Link>
                        <span className="mx-2">→</span>
                        <span className="text-gray-900">{post.title}</span>
                    </nav>

                    {/* Category Badge */}
                    <Link
                        href={`/${validLang}/category/${post.category.slug}`}
                        className="inline-block bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-700 transition-colors mb-4"
                    >
                        {post.category.name}
                    </Link>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {post.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            {formatDate(post.createdAt)}
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {post.readingTime} {t(validLang, 'readingTime')}
                        </span>
                    </div>

                    {/* Cover Image */}
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Excerpt */}
                    <p className={`text-xl text-gray-700 mb-8 leading-relaxed ${validLang === 'ar' ? 'text-right' : 'text-left'}`}>
                        {post.excerpt}
                    </p>

                    {/* Content */}
                    <div
                        className={`max-w-none prose prose-lg prose-a:text-primary-600 prose-code:text-primary-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-table:border prose-th:border prose-td:border ${validLang === 'ar' ? 'text-right' : 'text-left'}`}
                        style={{ direction: validLang === 'ar' ? 'rtl' : 'ltr' }}
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                    />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                {validLang === 'ar' ? 'الوسوم' : 'Tags'}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-16">
                    <div className="container-custom">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            {t(validLang, 'relatedPosts')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost: any) => (
                                <PostCard key={relatedPost._id} post={relatedPost} lang={validLang} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
