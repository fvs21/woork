"use client";

import Form from "@/components/Form/Form";
import styles from "./ForgotPassword.module.scss";
import InputEmailOrPhone from "../login/InputEmailOrPhone";
import { useState } from "react";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { isEmail } from "@/utils/authentication/LoginUtils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForgotPassword } from "@/api/hooks/authentication";

export default function ForgotPasswordForm() {
    const [credential, setCredential] = useState("");
    const [countryCode, setCountryCode] = useState("");

    const { forgotPassword, forgotPasswordInvalid } = useForgotPassword();

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e) {
        e.preventDefault(); 

        if(!credential) 
            return;

        setErrorMsg("");

        try {
            const request = await forgotPassword({
                'credential': isEmail(credential) ? credential : countryCode+credential
            });
            setSuccessMsg(request.data);
        } catch(error) {
           setErrorMsg(error.response.data.message);
        }
    }

    return (
        <Form className={styles.forgotPasswordFormContainer}>
            <div className={styles['forgot-password-form']}>
                <div className={styles['form-title']}>
                    Restablece tu contraseña
                </div>
                <div className={styles['forgot-password-instructions']}>
                    <span>Ingresa tu correo electrónico o número de teléfono para enviarte el código de recuperación.</span>
                </div>
                <br/>
                <form onSubmit={handleSubmit}>
                    <div className={styles['input-field']}>
                        <InputEmailOrPhone
                            className={styles.formInput}
                            credential={credential}
                            changeCredential={setCredential}
                            countryCode={countryCode}
                            changeCountryCode={setCountryCode}/>
                        {successMsg && <span className="success-msg">{successMsg}</span>}
                        {errorMsg && <span className="error-msg">{errorMsg}</span>}
                    </div>
                    <SubmitButton active={!forgotPasswordInvalid}>
                        Enviar
                    </SubmitButton>
                </form>
                <hr className="hr-line" style={{margin: "1.25rem 0"}}/>
                <Link href="/login" className={styles.returnBtn}>Regresar a inicio de sesión</Link>
            </div>
        </Form>
    )
}