'use client';

import Navbar from "../../../components/navbar/NavBar"
import styles from './Register.module.scss'
import { useState } from "react"
import Form from "../../../components/form/Form";
import RegistrationStepCounter from '../../../features/Register/RegistrationStepCounter';

export default function RegisterPage() {
    const [step, setStep] = useState(0);

    return (
        <>
            <Navbar showButtons={false} />
            <div className={styles['register-form']}>
                <Form>
                    <RegistrationStepCounter step={step} setStep={setStep}/>    
                </Form> 
            </div>
        </>
    )
}