import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Image from '@/models/Image';
import { requireAuth } from '@/lib/middleware';

// DELETE image
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth();
        await dbConnect();
        const { id } = await params;

        const image = await Image.findByIdAndDelete(id);

        if (!image) {
            return NextResponse.json({ error: 'الصورة غير موجودة' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
        }
        return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
    }
}
