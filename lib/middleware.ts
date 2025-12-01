import { cookies } from 'next/headers';
import { verifyToken } from './auth';

export async function getAuthUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
        return null;
    }

    const payload = verifyToken(token);
    return payload;
}

export async function requireAuth() {
    const user = await getAuthUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    return user;
}
