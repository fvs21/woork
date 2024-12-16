"use client";

import Logotype from '@/Components/Logotype/Logotype';
import RegisterForm from '@/Features/Registration/RegisterForm';
import Head from 'next/head';
import styles from "../Auth.module.scss";
import Footer from '@/Components/Footer/Footer';

export default function Register({errors}) {
    return (
        <div className={'global-container'}>
            <title>Woork - Regístrate</title>
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

