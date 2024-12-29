import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const guestRoutes: Array<string> = [
    '/',
    '/login',
    '/register',
    '/forgot-password'
];

const authenticatedRoutes: Array<string> = [
    '/dashboard',
    '/verify-phone',
    '/profile',
    '/profile/edit',
    '/posting/create',
    '/messages'
];

const dynamicAuthRoutes: Array<string> = [
    '/profile/show/'
]

export async function middleware(request: NextRequest) {
    const path: string = request.nextUrl.pathname;

    const cookie = (await cookies()).get('user_r')?.value;
    const isAuthenticated = cookie != null;

    if(isAuthenticated && guestRoutes.includes(path)) {
        return NextResponse.redirect(new URL('/explore', request.nextUrl));
    }

    if(!isAuthenticated && (dynamicAuthRoutes.some((elem) => path.startsWith(elem)) || authenticatedRoutes.includes(path))) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    const cookieStore = await cookies();
    if(!cookieStore.get('theme')) {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();

        const expiration = new Date(year+1, month, day);

        cookieStore.set(
            'theme', 'light', {
                sameSite: true,
                expires: expiration
            }
        )
    }

    return NextResponse.next();
}

export const config = { 
    matcher: '/((?!.*\\.).*)' 
}