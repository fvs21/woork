import { cookies } from "next/headers";

export const refreshToken = async () => {
    const cookiesList = await cookies();
    const parsed = cookiesList._parsed;

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
    
        });
        return await data.json();
    } catch {
        return null;
    }
}

export const getUser = async (accessToken) => {
    if(accessToken?.error == true) {
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
        });

        const json = await data.json();

        return json;
    } catch(error) {
        console.log(error);
        
        return null;
    }
}