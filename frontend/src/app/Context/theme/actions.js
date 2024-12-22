"use server"

import { cookies } from "next/headers";

export const switchTheme = async (val) => {
    const cookieStore = await cookies();
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();

    const expiration = new Date(year+1, month, day);
    
    cookieStore.set('theme', val, {
        sameSite: true,
        expires: expiration
    });
}