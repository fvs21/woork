import Logotype from "@/Components/Logotype/Logotype";
import styles from "./Auth.module.scss";
import { Head } from '@inertiajs/react';
import ResetPasswordForm from "@/Features/ResetPassword/ResetPasswordForm";
import Footer from "@/Components/Footer/Footer";
import Layout from "@/Components/Layout/Layout";

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
