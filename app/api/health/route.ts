import { NextResponse } from 'next/server';

/**
 * Health check endpoint for Cloud Run
 * This is a simple, lightweight endpoint that confirms the app is running
 * No database calls, no heavy computation - just a quick response
 */
export async function GET() {
    return NextResponse.json(
        {
            status: 'ok',
            timestamp: new Date().toISOString()
        },
        { status: 200 }
    );
}

// Disable caching for health checks
export const dynamic = 'force-dynamic';
export const revalidate = 0;
