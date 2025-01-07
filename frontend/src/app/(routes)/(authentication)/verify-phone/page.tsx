import Logotype from "@/components/Logotype/Logotype";
import PhoneVerification from "@/features/phoneverification/PhoneVerification";
import styles from "../Auth.module.scss";
import Layout from "@/components/Layout/Layout";

export const metadata = {
    title: "Woork - Verifica tu número"
}

export default function Page() {
    return (
        <Layout>
            <div className="global-container">
                <div className={styles.verifyPhoneContainer}>
                    <div className={styles['logotype-container']}>
                        <Logotype width={"200px"} />
                    </div>
                    <PhoneVerification />       
                </div> 
            </div>
        </Layout>
    )
}