'use client'

import PhoneVerification from "../../../../features/PhoneVerification/PhoneVerification";
import styles from "../Register.module.scss";
import Form from "../../../../components/Form/Form";
import Logotype from "../../../../components/Logotype/Logotype"
import { useLogout } from "../../../../hooks/authentication";

export default function VerificationPage() {
    const {logoutFn} = useLogout();

    async function logoutUser() {
        try {
            await logoutFn();
            window.location.replace("/");
        } catch(error) {
            console.log(error);


        }
    }

    return (
        <div className={`${styles['register-form']} bg-gray`}>
            <div className={styles['logout-btn-container']}>
                <button onClick={logoutUser} className={styles['logout-btn']}>Cerrar sesión</button>
            </div>
            <div className={styles['logotype-container']}>
                <Logotype width={"200px"} />
            </div>
            <Form>
                <PhoneVerification />    
            </Form> 
        </div>
    )
}