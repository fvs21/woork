import styles from "./Auth.module.scss";
import ResetPasswordForm from "@/features/resetpassword/ResetPasswordForm";
import Footer from "@/components/Footer/Footer";
import Layout from "@/components/Layout/Layout";

export default function ResetPassword({ token, phone, email }) {
    return (
        <Layout>
            <div className={`${styles['reset-password-container']}`}>
                <ResetPasswordForm 
                    credential={phone || email} 
                    token={token}/>
            </div>
            <Footer />
        </Layout>
    );
}
