import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { requireAuth } from '@/lib/middleware';
import { calculateReadingTime } from '@/lib/utils';

// GET single post
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth();
        await dbConnect();
        const { id } = await params;

        const post = await Post.findById(id).populate('category').lean() as any;

        if (!post) {
            return NextResponse.json({ error: 'المقال غير موجود' }, { status: 404 });
        }

        return NextResponse.json(JSON.parse(JSON.stringify(post)));
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
        }
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}

// PUT update post
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth();
        await dbConnect();
        const { id } = await params;

        const data = await request.json();

        // Calculate reading time if content changed
        if (data.content) {
            data.readingTime = calculateReadingTime(data.content);
        }

        const post = await Post.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        ).populate('category').lean() as any;

        if (!post) {
            return NextResponse.json({ error: 'المقال غير موجود' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            post: JSON.parse(JSON.stringify(post)),
        });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
        }
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}

// DELETE post
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth();
        await dbConnect();
        const { id } = await params;

        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return NextResponse.json({ error: 'المقال غير موجود' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
        }
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}
