import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Image from '@/models/Image';
import { requireAuth } from '@/lib/middleware';

// GET all images
export async function GET() {
    try {
        await dbConnect();

        const images = await Image.find().sort({ createdAt: -1 }).lean();

        return NextResponse.json(JSON.parse(JSON.stringify(images)));
    } catch (error) {
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}

// POST create new image
export async function POST(request: NextRequest) {
    try {
        await requireAuth();
        await dbConnect();

        const data = await request.json();

        const image = await Image.create(data);

        return NextResponse.json({
            success: true,
            image: JSON.parse(JSON.stringify(image)),
        }, { status: 201 });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
        }
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}
