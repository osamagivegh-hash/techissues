import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import { requireAuth } from '@/lib/middleware';

// POST - Submit a new message (public - no auth required)
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const data = await request.json();

        // Validate required fields
        if (!data.name || !data.email || !data.subject || !data.message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Create message
        const message = await Message.create({
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            subject: data.subject.trim(),
            message: data.message.trim(),
            isRead: false,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Message sent successfully',
                id: message._id
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating message:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send message' },
            { status: 500 }
        );
    }
}

// GET - Get all messages (admin only)
export async function GET(request: NextRequest) {
    try {
        await requireAuth();
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '20', 10);
        const filter = searchParams.get('filter'); // 'unread', 'read', or 'all'
        const skip = (page - 1) * limit;

        // Build query based on filter
        let query: any = {};
        if (filter === 'unread') {
            query.isRead = false;
        } else if (filter === 'read') {
            query.isRead = true;
        }

        const [messages, total, unreadCount] = await Promise.all([
            Message.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Message.countDocuments(query),
            Message.countDocuments({ isRead: false }),
        ]);

        return NextResponse.json({
            messages: JSON.parse(JSON.stringify(messages)),
            total,
            unreadCount,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        console.error('Error fetching messages:', error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}
