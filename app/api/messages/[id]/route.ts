import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import { requireAuth } from '@/lib/middleware';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET - Get a single message (admin only)
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await requireAuth();
        await dbConnect();
        const { id } = await params;

        const message = await Message.findById(id).lean();

        if (!message) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        return NextResponse.json(JSON.parse(JSON.stringify(message)));
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json({ error: 'Failed to fetch message' }, { status: 500 });
    }
}

// PUT - Update message (mark as read/unread)
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        await requireAuth();
        await dbConnect();
        const { id } = await params;

        const data = await request.json();

        const message = await Message.findByIdAndUpdate(
            id,
            { isRead: data.isRead },
            { new: true }
        ).lean();

        if (!message) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        return NextResponse.json(JSON.parse(JSON.stringify(message)));
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
    }
}

// DELETE - Delete a message (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await requireAuth();
        await dbConnect();
        const { id } = await params;

        const message = await Message.findByIdAndDelete(id);

        if (!message) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Message deleted' });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
}
