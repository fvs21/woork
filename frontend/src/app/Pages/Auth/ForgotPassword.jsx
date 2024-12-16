import { Head, router } from '@inertiajs/react';
import "../../../css/globals.scss";
import styles from "./Auth.module.scss";
import Footer from '@/Components/Footer/Footer';
import Logotype from '@/Components/Logotype/Logotype';
import ForgotPasswordForm from '@/Features/ForgotPassword/ForgotPasswordForm';
import CloseSVG from '@/Components/SVGs/Close';
import { useTheme } from '@/Hooks/theme';

export default function ForgotPassword({ status, errors }) {
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
                <ForgotPasswordForm status={status} errors={errors}/>
            </div>
            <Footer />
        </div>
    );
}
