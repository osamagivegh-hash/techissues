import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLanguage, isValidLanguage } from './lib/i18n';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip middleware for admin, api, static files, and special Next.js routes
    if (
        pathname.startsWith('/admin') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.includes('/uploads/') ||
        pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/)
    ) {
        return NextResponse.next();
    }

    // Check if pathname starts with a language
    const pathnameHasLang = isValidLanguage(pathname.split('/')[1]);

    // If on root, redirect to default language
    if (pathname === '/') {
        return NextResponse.redirect(new URL(`/${defaultLanguage}`, request.url));
    }

    // If no valid language in path, redirect to default language
    if (!pathnameHasLang) {
        return NextResponse.redirect(
            new URL(`/${defaultLanguage}${pathname}`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api routes
         * - _next static files
         * - admin routes
         * - image files
         */
        '/((?!api|_next/static|_next/image|favicon.ico|uploads).*)',
    ],
};
