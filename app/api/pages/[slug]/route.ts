import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import { requireAuth } from '@/lib/middleware';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// GET - Get a single page by slug (public for frontend)
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { slug } = await params;

        const page = await Page.findOne({ slug, isActive: true }).lean();

        if (!page) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(JSON.parse(JSON.stringify(page)));
    } catch (error: any) {
        console.error('Error fetching page:', error);
        return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
    }
}

// PUT - Update a page (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        await requireAuth();
        await dbConnect();
        const { slug } = await params;

        const data = await request.json();

        const page = await Page.findOneAndUpdate(
            { slug },
            {
                titleAr: data.titleAr,
                titleEn: data.titleEn,
                contentAr: data.contentAr,
                contentEn: data.contentEn,
                isActive: data.isActive,
            },
            { new: true }
        ).lean();

        if (!page) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(JSON.parse(JSON.stringify(page)));
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        console.error('Error updating page:', error);
        return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
    }
}
