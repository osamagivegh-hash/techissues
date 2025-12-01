'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Language, t } from '@/lib/i18n';

interface PostCardProps {
    post: {
        _id: string;
        title: string;
        slug: string;
        excerpt: string;
        coverImage: string;
        category: {
            _id: string;
            name: string;
            slug: string;
        };
        readingTime: number;
        createdAt: string;
    };
    lang: Language;
}

export default function PostCard({ post, lang }: PostCardProps) {
    return (
        <article className="card group">
            {/* Cover Image */}
            <div className="block relative h-48 overflow-hidden">
                <Link href={`/${lang}/posts/${post.slug}`} className="block relative h-full w-full">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
                {/* Category Badge */}
                <div className="absolute top-3 right-3 z-10">
                    <Link
                        href={`/${lang}/category/${post.category.slug}`}
                        className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-primary-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {post.category.name}
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    <Link href={`/${lang}/posts/${post.slug}`} className="hover:text-primary-600 transition-colors">
                        {post.title}
                    </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(post.createdAt)}</span>
                    <span>
                        {post.readingTime} {t(lang, 'readingTime')}
                    </span>
                </div>
            </div>
        </article>
    );
}
