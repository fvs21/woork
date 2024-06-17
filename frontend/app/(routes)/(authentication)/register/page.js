'use client';

import styles from './Register.module.scss';
import "../../../assets/globals.scss";
import { useState } from "react"
import Form from "../../../components/Form/Form";
import RegistrationStepCounter from '../../../features/Register/RegistrationStepCounter';
import Logotype from "../../../components/Logotype/Logotype";

export default function RegisterPage() {
    const [step, setStep] = useState(0);

    return (
        <div className={`${styles['register-form']} bg-gray`}>
            <div className={styles['logotype-container']}>
                <Logotype width={"200px"} />
            </div>
            <Form>
                <RegistrationStepCounter step={step} setStep={setStep}/>    
            </Form> 
        </div>
    )
}