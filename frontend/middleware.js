import { NextResponse } from "next/server";

function parseJwt(token) {
    let base64Payload = token.split('.')[1];
    let payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
}

export function middleware(request) {
    const token = request.cookies.get('user_r');
    const path = request.nextUrl.pathname;
    const baseUrl = "http://localhost:3000"

    if(token == null) {
        const restrictedRoutes = ['/account', '/register/verify']
        if(restrictedRoutes.includes(path)) {
            return NextResponse.redirect(baseUrl + '/login');   
        }
    }
    if(token != null) {
        const payload = parseJwt(token.value);
        const restrictedRoutes = ['/login', '/register', '/register/verify'];


        if(!payload.verified && path !== '/register/verify') {
            return NextResponse.redirect(baseUrl + '/register/verify');
        }
        
        if(payload.verified && restrictedRoutes.includes(path)) {
            return NextResponse.redirect(baseUrl + "/");
        }
    }
}

export const config = { 
    matcher: '/((?!.*\\.).*)' 
}
