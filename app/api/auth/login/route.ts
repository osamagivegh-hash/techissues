import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { comparePassword, generateToken } from '@/lib/auth';
import { loginSchema, validateInput, safeParseJson } from '@/lib/security';

export async function POST(request: NextRequest) {
    try {
        // 1. Safe JSON parsing with size limit
        const parseResult = await safeParseJson<{ email: string; password: string }>(
            request,
            1024 * 10 // 10KB max for login
        );

        if (!parseResult.success) {
            return NextResponse.json(
                { error: parseResult.error || 'طلب غير صالح' },
                { status: 400 }
            );
        }

        // 2. Input validation
        const validation = validateInput(loginSchema, parseResult.data);

        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error || 'بيانات غير صالحة' },
                { status: 400 }
            );
        }

        const { email, password } = validation.data!;

        await dbConnect();

        // 3. Find user (case-insensitive, normalized)
        const user = await User.findOne({
            email: { $regex: new RegExp(`^${email}$`, 'i') }
        }).lean();

        if (!user) {
            // Use same error message to prevent user enumeration
            return NextResponse.json(
                { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
                { status: 401 }
            );
        }

        // 4. Verify password
        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
                { status: 401 }
            );
        }

        // 5. Generate JWT token
        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        // 6. Create response with token in cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

        // 7. Set HTTP-only secure cookie
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // Changed from 'lax' to 'strict' for better CSRF protection
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error) {
        // Log error without exposing details
        console.error('Login error occurred');
        return NextResponse.json(
            { error: 'حدث خطأ أثناء تسجيل الدخول' },
            { status: 500 }
        );
    }
}

