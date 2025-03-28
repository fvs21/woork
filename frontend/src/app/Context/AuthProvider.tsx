import { getUser, refreshToken } from "@/api/server/auth";
import AuthClient from "./AuthClient";
import { log } from "console";

export const dynamic = 'force-dynamic'

export default async function AuthProvider({children}) {
    const accessToken = await refreshToken();
    const user = await getUser(accessToken);

    return (
        <AuthClient accessToken={accessToken?.access_token || null} user={user}>
            {children}
        </AuthClient>
    );
}