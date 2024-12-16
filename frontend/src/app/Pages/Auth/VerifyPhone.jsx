import Logotype from "@/Components/Logotype/Logotype";
import PhoneVerification from "@/Features/PhoneVerification/PhoneVerification";
import styles from "./Auth.module.scss";
import { Head, router } from "@inertiajs/react";
import Footer from "@/Components/Footer/Footer";
import Layout from "@/Components/Layout/Layout";

export default function VerificationPage() {
    function handleLogout(e) {
        e.preventDefault();

        router.post('/logout');
    }
    
    return (
        <Layout>
            <div className="global-container">
                <Head title="Verifica tu número" />
                <div className={styles['verify-phone-container']}>
                    <div className={styles['logotype-container']}>
                        <Logotype width={"200px"} />
                    </div>
                    <PhoneVerification />       
                </div> 
                <Footer />
            </div>
        </Layout>
    )
}