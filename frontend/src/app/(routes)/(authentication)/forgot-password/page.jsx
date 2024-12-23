import styles from "../Auth.module.scss";
import Footer from '@/components/Footer/Footer';
import Logotype from '@/components/Logotype/Logotype';
import ForgotPasswordForm from '@/features/forgotpassword/ForgotPasswordForm';

export const metadata = {
    title: "Woork - ¿Olvidaste tu constraseña?"
}

export default function Page() {
    return (
        <div className='global-container'>
            <div className={`${styles['forgot-password-container']}`}>
                <div className={styles['logotype-container']}>
                    <Logotype width={"200px"} />
                </div>
                <ForgotPasswordForm />
            </div>
            <Footer />
        </div>
    )
}