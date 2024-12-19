import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const guestRoutes = [
    '/',
    '/login',
    '/register',
    '/forgot-password'
];

const authenticatedRoutes = [
    '/dashboard',
    '/verify-phone',
    '/profile',
    '/profile/edit',
    '/posting/create'
];

const dynamicAuthRoutes = [
    '/profile/show/'
]

export async function middleware(request) {
    const path = request.nextUrl.pathname;

    const cookie = (await cookies()).get('user_r')?.value;
    const isAuthenticated = cookie != null;

    if(isAuthenticated && guestRoutes.includes(path)) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    if(!isAuthenticated && (dynamicAuthRoutes.some((elem) => path.startsWith(elem)) || authenticatedRoutes.includes(path))) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    return NextResponse.next();
}

export const config = { 
    matcher: '/((?!.*\\.).*)' 
}