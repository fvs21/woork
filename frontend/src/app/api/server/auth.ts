import { User } from "@/types/global";
import { cookies } from "next/headers";

export type Auth = { 
    access_token: string; 
}

export const refreshToken = async (): Promise<Auth> => {
    const cookiesList = await cookies();
    const parsed = cookiesList['_parsed'];

    if(parsed.get('user_r') === undefined) {
        return null;
    }

    try {
        const data = await fetch("http://localhost:8000/api/auth/refresh", {
            method: "GET",
            credentials: 'include',
            headers: {
                Cookie: (await cookies()).toString(),
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 0,
                tags: ['refresh']
            }
        });
        return await data.json();
    } catch {
        return null;
    }
}

export const getUser = async (accessToken: Auth): Promise<User> => {
    if(accessToken == null || accessToken?.access_token == null) {
        return null;
    }

    try {
        const data = await fetch("http://localhost:8000/api/user/verify", {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken?.access_token}`
            },
            next: {
                tags: ['user']
            }
        });

        const json = await data.json();
        return json;
    } catch(error) {
        console.log(error);
        
        return null;
    }
}