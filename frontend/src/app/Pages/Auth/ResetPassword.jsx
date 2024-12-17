import Logotype from "@/components/Logotype/Logotype";
import styles from "./Auth.module.scss";
import { Head } from '@inertiajs/react';
import ResetPasswordForm from "@/features/resetpassword/ResetPasswordForm";
import Footer from "@/components/Footer/Footer";
import Layout from "@/components/Layout/Layout";

export default function ResetPassword({ token, phone, email }) {
    return (
        <Layout>
            <Head title="Elige tu nueva contraseña" />
            <div className={`${styles['reset-password-container']}`}>
                <ResetPasswordForm 
                    credential={phone || email} 
                    token={token}/>
            </div>
            <Footer />
        </Layout>
    );
}
