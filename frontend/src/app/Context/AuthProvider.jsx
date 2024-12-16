import { getUser, refreshToken } from "@/api/authServer";
import { cookies } from "next/headers";
import AuthClient from "./AuthClient";

export default async function AuthProvider({children}) {
    const accessToken = await refreshToken(cookies);
    const user = await getUser(accessToken);

    return (
        <AuthClient accessToken={accessToken} user={user}>
            {children}
        </AuthClient>
    );
}