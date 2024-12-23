import { Head, router } from '@inertiajs/react';
import "../../../css/globals.scss";
import styles from "./Auth.module.scss";
import Footer from '@/components/Footer/Footer';
import Logotype from '@/components/Logotype/Logotype';
import ForgotPasswordForm from '@/features/forgotpassword/ForgotPasswordForm';
import CloseSVG from '@/components/SVGs/Close';
import { useTheme } from '@/hooks/theme';

export default function ForgotPassword() {
    const [theme] = useTheme();
    
    return (
        <div className='global-container'>
            <Head title='Restablecer contraseña' />
            <button className={styles['close-btn']} onClick={() =>  router.visit("/login")}>
                <CloseSVG width={"25px"} color={theme == 'dark' ? 'white' : 'black'}/>
            </button>
            <div className={`${styles['forgot-password-container']}`}>
                <div className={styles['logotype-container']}>
                    <Logotype width={"200px"} />
                </div>
                <ForgotPasswordForm />
            </div>
            <Footer />
        </div>
    );
}
