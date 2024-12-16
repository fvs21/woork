"use client";

import { useState } from "react";
import InputEmailOrPhone from "./InputEmailOrPhone";
import ValidatedInput from "@/Components/ValidatedInput/ValidatedInput";
import SubmitButton from "@/Components/SubmitButton/SubmitButton";
import Link from "next/link";
import styles from "./LoginForm.module.scss";
import { isEmail } from "@/Utils/authentication/LoginUtils";
import Form from "@/Components/Form/Form";
import { useLogin } from "@/api/hooks/authentication";
import { useRouter } from "next/router";

export default function LoginForm({errors}) {
    const [credential, setCredential] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const { login, isLoading } = useLogin();

    async function handleSubmit(e) {
        e.preventDefault();

        const cred = isEmail(credential) ? credential : countryCode+credential;
        const router = useRouter();

        try {
            await login({
                credential: cred,
                password: password
            });
            router.push("/dashboard");
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Form className={styles.loginFormContainer}>
            <div className={styles['login-form']}>
                <form onSubmit={handleSubmit} method="post">
                    <div className={styles['form-title']}>
                        Inicia sesión
                    </div>
                    <div className={styles['login-input-container']}>
                        <InputEmailOrPhone 
                            className={styles.formInput}
                            credential={credential}
                            changeCredential={setCredential}
                            countryCode={countryCode}
                            changeCountryCode={setCountryCode}
                        />
                    </div>
                    <div className={styles['login-input-container']}>
                        <ValidatedInput 
                            className={styles.formInput}
                            valid={true} 
                            name={"password"} 
                            type={"password"} 
                            placeholder={"Contraseña"} 
                            value={password}
                            setValue={setPassword} 
                            autofocus={false} 
                            autoComplete="on"/>
                            {errors && <span className="error-msg">{errors['error'] || errors['credential']}</span>}
                    </div>
                    <div className={styles['submit-btn-container']}>
                        <SubmitButton 
                            active={true}>
                                Iniciar sesión
                        </SubmitButton>
                    </div>
                </form>
                <div style={{textAlign: "center", margin: "20px 0"}}>
                    <Link className={styles['forgot-password-link']} href="/forgot-password">¿Olvidaste tu contraseña?</Link>
                </div>
                <hr className="hr-line"/>
                <div style={{textAlign: "center", marginTop: "30px"}}>
                    <span className={styles['bottom-links']}>
                        <Link href="/register">¿No tienes una cuenta?</Link>
                    </span>
                </div>
            </div>
        </Form>
    )
    
}