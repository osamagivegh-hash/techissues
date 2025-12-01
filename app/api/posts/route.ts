import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { requireAuth } from '@/lib/middleware';
import { generateSlug, calculateReadingTime } from '@/lib/utils';

// GET all posts
export async function GET(request: NextRequest) {
    try {
        await requireAuth();
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;

        const [posts, total] = await Promise.all([
            Post.find()
                .populate('category')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Post.countDocuments(),
        ]);

        return NextResponse.json({
            posts: JSON.parse(JSON.stringify(posts)),
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
        }
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}

// POST create new post
export async function POST(request: NextRequest) {
    try {
        await requireAuth();
        await dbConnect();

        const data = await request.json();

        // Generate slug if not provided
        if (!data.slug) {
            data.slug = generateSlug(data.title);
        }

        // Calculate reading time
        if (data.content) {
            data.readingTime = calculateReadingTime(data.content);
        }

        const post = await Post.create(data);
        const populatedPost = await Post.findById(post._id).populate('category').lean();

        return NextResponse.json({
            success: true,
            post: JSON.parse(JSON.stringify(populatedPost)),
        }, { status: 201 });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
        }
        if (error.code === 11000) {
            return NextResponse.json({ error: 'العنوان موجود مسبقاً' }, { status: 400 });
        }
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}
