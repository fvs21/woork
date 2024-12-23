import styles from "../../Auth.module.scss";
import ResetPasswordForm from "@/features/resetpassword/ResetPasswordForm";
import Footer from "@/components/Footer/Footer";
import Layout from "@/components/Layout/Layout";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Woork - Reestablece tu contraseña"
}

export default async function Page({searchParams, params}) {
    const token = await params?.token;
    const searchQuery = await searchParams;

    const credential = searchQuery?.email || searchQuery?.phone;

    if(!token || ! credential)
        notFound();

    return (
        <Layout>
            <div className={`${styles['reset-password-container']}`}>
                <ResetPasswordForm 
                    credential={credential} 
                    token={token}/>
            </div>
            <Footer />
        </Layout>
    )
}