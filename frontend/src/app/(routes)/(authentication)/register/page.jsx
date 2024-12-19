import Logotype from '@/components/Logotype/Logotype';
import RegisterForm from '@/features/registration/RegisterForm';
import styles from "../Auth.module.scss";
import Footer from '@/components/Footer/Footer';

export const metadata = {
    title: "Woork - Regístrate"
}

export default function Page() {
    return (
        <div className={'global-container'}>
            <div className={`${styles.registerContainer}`}>
                <div className={styles['logotype-container']}>
                    <Logotype width={"200px"} />
                </div>
                <RegisterForm />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

