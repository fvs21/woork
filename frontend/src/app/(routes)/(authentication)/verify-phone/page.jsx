import Logotype from "@/components/Logotype/Logotype";
import PhoneVerification from "@/features/phoneverification/PhoneVerification";
import styles from "../Auth.module.scss";
import Footer from "@/components/Footer/Footer";
import Layout from "@/components/Layout/Layout";

export const metadata = {
    title: "Woork - Verifica tu número"
}

export default function Page() {    
    return (
        <Layout>
            <div className="global-container">
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