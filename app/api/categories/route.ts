import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import { requireAuth } from '@/lib/middleware';
import { generateSlug } from '@/lib/utils';

// GET all categories
export async function GET() {
    try {
        await dbConnect();

        const categories = await Category.find().sort({ name: 1 }).lean();

        return NextResponse.json(JSON.parse(JSON.stringify(categories)));
    } catch (error) {
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}

// POST create new category
export async function POST(request: NextRequest) {
    try {
        await requireAuth();
        await dbConnect();

        const data = await request.json();

        // Generate slug if not provided
        if (!data.slug) {
            data.slug = generateSlug(data.name);
        }

        const category = await Category.create(data);

        return NextResponse.json({
            success: true,
            category: JSON.parse(JSON.stringify(category)),
        }, { status: 201 });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
        }
        if (error.code === 11000) {
            return NextResponse.json({ error: 'القسم موجود مسبقاً' }, { status: 400 });
        }
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}
