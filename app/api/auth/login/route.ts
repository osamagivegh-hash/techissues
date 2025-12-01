import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Normalize email to lowercase for consistent lookup
        const normalizedEmail = email.toLowerCase().trim();
        console.log(`Attempting login for email: ${normalizedEmail}`);

        // Find user by email (try exact match first, then case-insensitive regex as fallback)
        let user = await User.findOne({ email: normalizedEmail }).lean();
        if (!user) {
            // Fallback: case-insensitive search
            user = await User.findOne({ email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') } }).lean();
        }

        if (!user) {
            // Debug: Check if any users exist
            const userCount = await User.countDocuments();
            console.error(`Login failed: User not found for email: ${normalizedEmail}`);
            console.error(`Total users in database: ${userCount}`);
            if (userCount > 0) {
                const allUsers = await User.find({}).select('email').lean();
                console.error(`Existing user emails:`, allUsers.map(u => u.email));
            }
            return NextResponse.json(
                { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            console.error(`Login failed: Invalid password for email: ${email}`);
            return NextResponse.json(
                { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        // Create response with token in cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

        // Set HTTP-only cookie
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء تسجيل الدخول' },
            { status: 500 }
        );
    }
}
