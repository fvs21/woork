import Logotype from "@/components/Logotype/Logotype";
import styles from "./Auth.module.scss";
import LoginForm from "@/features/login/LoginForm";
import Footer from "@/components/Footer/Footer";
import "@/css/globals.scss";

export default function LoginPage({errors}) {
    return (
        <div className="global-container">
            <title>Woork - Regístrate</title>
            <div className={`${styles.loginContainer}`}>
                <div className={styles['logotype-container']}>
                    <Logotype width={"200px"} />
                </div>
                <LoginForm 
                    errors={errors} />
            </div>
            <Footer />
        </div>
    )
}