'use client';

import styles from './Register.module.scss';
import "../../../assets/globals.scss";
import Form from "../../../components/Form/Form";
import Logotype from "../../../components/Logotype/Logotype";
import RegisterForm from '../../../features/Register/RegisterForm';

export default function RegisterPage() {
    return (
        <div className={`${styles['register-form']} bg-gray`}>
            <div className={styles['logotype-container']}>
                <Logotype width={"200px"} />
            </div>
            <Form>
                <RegisterForm />    
            </Form> 
        </div>
    )
}