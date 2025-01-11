import styles from "./Verify.module.scss";
import Layout from "@/components/Layout/Layout";
import { getUser, refreshToken } from "@/api/server/auth";
import { redirect } from "next/navigation";
import MainView from "@/features/verification/components/MainView";

export const metadata = {
    title: 'Woork - Verifica tu identidad'
}

export default async function Page() {
    const accessToken = await refreshToken();
    const user = await getUser(accessToken);

    if(user.hasIdentityVerified) {
        redirect("/dashboard");
    }

    return (
        <Layout>
            <MainView />
        </Layout>
    )
}