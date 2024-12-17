import Logotype from "@/components/Logotype/Logotype";
import styles from "../Auth.module.scss";
import LoginForm from "@/features/login/LoginForm";
import Footer from "@/components/Footer/Footer";
import "@/styles/globals.scss";

export const metadata = {
    title: "Woork - Inicia sesión"
}

export default function LoginPage() {
    return (
        <div className="global-container">
            <div className={`${styles.loginContainer}`}>
                <div className={styles['logotype-container']}>
                    <Logotype width={"200px"} />
                </div>
                <LoginForm />
            </div>
            <Footer />
        </div>
    )
}