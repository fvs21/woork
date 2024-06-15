import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get('refresh_token');

    if(token == null && request.nextUrl.pathname === '/account') {
        return NextResponse.redirect("http://localhost:3000/login");     
    }
    if(token != null) {
        if(request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
            return NextResponse.redirect("http://localhost:3000/");
        }
    }
}
