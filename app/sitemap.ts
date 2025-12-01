import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import Category from '@/models/Category';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/search`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
    ];

    // Try to connect to database and get dynamic content
    // If database is not available (e.g., during build), return static pages only
    let posts: Array<{ slug: string; updatedAt: Date }> = [];
    let categories: Array<{ slug: string }> = [];

    try {
        // Check if MONGODB_URI is available (not available during build)
        if (process.env.MONGODB_URI) {
            await dbConnect();
            
            // Get all published posts
            posts = await Post.find({ status: 'published' }).select('slug updatedAt').lean();
            
            // Get all categories
            categories = await Category.find().select('slug').lean();
        }
    } catch (error) {
        // If database connection fails (e.g., during build), continue with static pages only
        console.warn('Sitemap: Database not available, using static pages only');
    }

    // Category pages
    const categoryPages = categories.map((category) => ({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }));

    // Post pages
    const postPages = posts.map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...categoryPages, ...postPages];
}
