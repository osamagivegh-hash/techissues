import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { formatDate } from '@/lib/utils';

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    await dbConnect();
    const { slug } = await params;
    const post = await Post.findOne({ slug }).populate('category').lean();

    if (!post) {
        return {
            title: 'المقال غير موجود',
        };
    }

    return {
        title: `${post.title} - مدونة التقنية`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
            type: 'article',
        },
    };
}

async function getPostData(slug: string) {
    await dbConnect();

    const post = await Post.findOne({ slug, status: 'published' })
        .populate('category')
        .lean();

    if (!post) {
        return null;
    }

    // Get related posts from the same category
    const relatedPosts = await Post.find({
        category: post.category._id,
        _id: { $ne: post._id },
        status: 'published',
    })
        .populate('category')
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();

    return {
        post: JSON.parse(JSON.stringify(post)),
        relatedPosts: JSON.parse(JSON.stringify(relatedPosts)),
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const data = await getPostData(slug);

    if (!data) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-gray-50 py-16">
                    <div className="container-custom text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">المقال غير موجود</h1>
                        <p className="text-gray-600 mb-8">عذراً، المقال المطلوب غير متوفر.</p>
                        <Link href="/" className="btn btn-primary">
                            العودة للرئيسية
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const { post, relatedPosts } = data;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                {/* Post Header */}
                <article className="bg-white">
                    <div className="container-custom py-12">
                        {/* Category */}
                        <Link
                            href={`/category/${post.category.slug}`}
                            className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-medium mb-4 hover:bg-primary-200 transition-colors"
                        >
                            {post.category.name}
                        </Link>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex items-center gap-6 text-gray-600 mb-8">
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
                                {post.readingTime} دقائق قراءة
                            </span>
                        </div>

                        {/* Cover Image */}
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none">
                            <div
                                className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">الوسوم:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm"
                                        >
                                            {tag}
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">مقالات ذات صلة</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost: any) => (
                                    <PostCard key={relatedPost._id} post={relatedPost} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
