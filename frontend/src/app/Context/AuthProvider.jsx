import { getUser, refreshToken } from "@/api/server/auth";
import AuthClient from "./AuthClient";

export default async function AuthProvider({children}) {
    const accessToken = await refreshToken();
    const user = await getUser(accessToken);

    return (
        <AuthClient accessToken={accessToken} user={user}>
            {children}
        </AuthClient>
    );
}