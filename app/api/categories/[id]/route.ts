import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Post from '@/models/Post';
import { requireAuth } from '@/lib/middleware';

// PUT update category
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth();
        await dbConnect();
        const { id } = await params;

        const data = await request.json();

        const category = await Category.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        ).lean();

        if (!category) {
            return NextResponse.json({ error: 'القسم غير موجود' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            category: JSON.parse(JSON.stringify(category)),
        });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
        }
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}

// DELETE category
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth();
        await dbConnect();
        const { id } = await params;

        // Check if category has posts
        const postsCount = await Post.countDocuments({ category: id });

        if (postsCount > 0) {
            return NextResponse.json(
                { error: `لا يمكن حذف القسم لأنه يحتوي على ${postsCount} مقالات` },
                { status: 400 }
            );
        }

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return NextResponse.json({ error: 'القسم غير موجود' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
        }
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}
