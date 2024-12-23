import Logotype from "@/components/Logotype/Logotype";
import styles from "../Auth.module.scss";
import LoginForm from "@/features/login/LoginForm";
import Footer from "@/components/Footer/Footer";
import "@/styles/globals.scss";

export const metadata = {
    title: "Woork - Inicia sesión"
}

export default async function Page({searchParams}) {
    const search = await searchParams;
    
    const error = search.failed == 'true' ? "La contraseña que colocaste no es correcta." : ""; 

    return (
        <div className="global-container">
            <div className={`${styles.loginContainer}`}>
                <div className={styles['logotype-container']}>
                    <Logotype width={"200px"} />
                </div>
                <LoginForm error={error} />
            </div>
            <Footer />
        </div>
    )
}