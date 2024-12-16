import Logotype from "@/Components/Logotype/Logotype";
import styles from "./Auth.module.scss";
import LoginForm from "@/Features/Login/LoginForm";
import Footer from "@/Components/Footer/Footer";
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