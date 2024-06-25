'use client'

import { useState } from "react"
import styles from './LoginForm.module.scss'
import InputEmailOrPhone from "./InputEmailOrPhone";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { DetermineEmailOrPhone } from "../../utils/authentication/LoginUtils";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import Link from "next/link";
import { useLoginUser } from "../../hooks/authentication";
import { INCORRECT_CREDENTIALS_ERROR } from "../../utils/authentication/LoginErrorResponses";
import "../../assets/globals.scss";

export default function LoginForm() {
    const [credential, setCredential] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const router = useRouter();
    const { setAuth } = useAuth();

    const body = {
        "password": password
    };

    const { loginUserFn } = useLoginUser();

    async function handleSubmit(e) {
        e.preventDefault();
    
        if(DetermineEmailOrPhone(credential)) {
            body['credential'] = credential;
        } else {
            body['credential'] = countryCode + credential;
        }

        try {
            const request = await loginUserFn(body);
            console.log(request);

            if(request.status == 200) {
                setAuth({
                    "access_token": request.data.access_token,
                    "loggedIn": true
                });
                
                if(request.data.user.verified) {
                    router.push("/account");
                } else {
                    router.push("/register/verify");
                }
                
            }
        } catch(error) {
            switch(error.response.data) {
                case INCORRECT_CREDENTIALS_ERROR:
                    setErrorMsg("La contraseña no es correcta.");
                    break;
            }
        }
    }

    return (
        <>
            <div className={styles['form-title']}>
                <h2>Inicia sesión</h2>
            </div>
            <hr className={styles['hr-style']} />
            <br/>
            <form onSubmit={handleSubmit} method="post">
                <InputEmailOrPhone credential={credential} changeCredential={setCredential} countryCode={countryCode}  
                    changeCountryCode={setCountryCode}/>
                <br/>
                <ValidatedInput valid={true} name={"password"} type={"password"} label={"Contraseña"} placeholder={"Contraseña"} 
                    setValue={setPassword} autofocus={false} />
                {errorMsg && <span className="error-msg">{errorMsg}</span>}
                <br/><br/>
                <SubmitButton active={true}>Iniciar sesión</SubmitButton>
            </form>
            <br/>
            <div className={styles['div-center']}>
                <span className={styles['bottom-links']}>
                    <Link href="/register">No tienes una cuenta?</Link>
                </span>
            </div>
        </>
    )
    
}