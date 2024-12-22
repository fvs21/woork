"use client";

import { useState } from "react";
import InputEmailOrPhone from "./InputEmailOrPhone";
import ValidatedInput from "@/components/ValidatedInput/ValidatedInput";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import Link from "next/link";
import styles from "./LoginForm.module.scss";
import { isEmail } from "@/utils/authentication/LoginUtils";
import Form from "@/components/Form/Form";
import { useLogin } from "@/api/hooks/authentication";
import { useRouter } from "next/navigation";
import LoadingSpinnerClear from "@/components/LoadingSpinnerClear";

export default function LoginForm({error}) {
    const [credential, setCredential] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(error);

    const { login, isLoading } = useLogin();
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        setErrorMsg("");

        const cred = isEmail(credential) ? credential : countryCode+credential;

        try {
            await login({
                credential: cred,
                password: password
            });
            router.push("/dashboard");
        } catch(error) {
            setErrorMsg(error.response.data.message);
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
                            autoComplete="on"
                            />
                            {errorMsg && <span className="error-msg">{errorMsg}</span>}
                    </div>
                    <div className={styles['submit-btn-container']}>
                        <SubmitButton 
                            active={true}>
                                {isLoading ? <LoadingSpinnerClear width={"18px"} /> : "Iniciar sesión"}
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