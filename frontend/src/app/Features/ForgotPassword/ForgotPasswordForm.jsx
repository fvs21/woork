import Form from "@/Components/Form/Form";
import styles from "./ForgotPassword.module.scss";
import InputEmailOrPhone from "../Login/InputEmailOrPhone";
import { useState } from "react";
import SubmitButton from "@/Components/SubmitButton/SubmitButton";
import { router } from "@inertiajs/react";
import { isEmail } from "@/Utils/authentication/LoginUtils";

export default function ForgotPasswordForm({status, errors}) {
    const [credential, setCredential] = useState("");
    const [countryCode, setCountryCode] = useState("");

    function handleSubmit(e) {
        e.preventDefault(); 

        if(!credential) 
            return;

        router.post("/forgot-password", {
            'credential': isEmail(credential) ? credential : countryCode+credential
        });
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
                        {status && <span className="success-msg">{status}</span>}
                        {errors && <span className="error-msg">{errors.email || errors.phone}</span>}
                    </div>
                    <SubmitButton active={true}>Enviar</SubmitButton>
                </form>
            </div>
        </Form>
    )
}