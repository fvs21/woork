import Logotype from '@/Components/Logotype/Logotype';
import RegisterForm from '@/Features/Registration/RegisterForm';
import { Head, Link, useForm } from '@inertiajs/react';
import styles from "./Auth.module.scss";
import Footer from '@/Components/Footer/Footer';

export default function Register({errors}) {
    return (
        <div className={'global-container'}>
            <Head title="Regístrate" />
            <div className={`${styles.registerContainer}`}>
                <div className={styles['logotype-container']}>
                    <Logotype width={"200px"} />
                </div>
                <RegisterForm errors={errors} />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}
