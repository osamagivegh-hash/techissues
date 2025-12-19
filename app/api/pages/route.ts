import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import { requireAuth } from '@/lib/middleware';

// GET - Get all pages (admin only)
export async function GET(request: NextRequest) {
    try {
        await requireAuth();
        await dbConnect();

        const pages = await Page.find().sort({ slug: 1 }).lean();

        return NextResponse.json({
            pages: JSON.parse(JSON.stringify(pages)),
        });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        console.error('Error fetching pages:', error);
        return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
    }
}

// POST - Create a new page (admin only) - Used for initial seeding
export async function POST(request: NextRequest) {
    try {
        await requireAuth();
        await dbConnect();

        const data = await request.json();

        // Validate required fields
        if (!data.slug || !data.titleAr || !data.titleEn || !data.contentAr || !data.contentEn) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Check if page with slug already exists
        const existingPage = await Page.findOne({ slug: data.slug });
        if (existingPage) {
            return NextResponse.json(
                { error: 'Page with this slug already exists' },
                { status: 400 }
            );
        }

        const page = await Page.create({
            slug: data.slug,
            titleAr: data.titleAr,
            titleEn: data.titleEn,
            contentAr: data.contentAr,
            contentEn: data.contentEn,
            isActive: data.isActive ?? true,
        });

        return NextResponse.json(JSON.parse(JSON.stringify(page)), { status: 201 });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        console.error('Error creating page:', error);
        return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
    }
}
