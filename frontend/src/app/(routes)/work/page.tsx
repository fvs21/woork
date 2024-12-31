import { getUser, refreshToken } from "@/api/server/auth"
import Layout from "@/components/Layout/Layout";
import { redirect } from "next/navigation";

export default async function Page() {
    const accessToken = await refreshToken();
    const user = await getUser(accessToken);

    if(!user.is_worker)
        redirect("/dashboard");

    return (
        <Layout>
            mfdjklsa
        </Layout>
    )
}