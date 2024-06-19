'use client'

import { useState } from "react"
import styles from './LoginForm.module.scss'
import InputEmailOrPhone from "./InputEmailOrPhone";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import axios from '../../api/axios';
import { useMutation } from "react-query";
import { DetermineEmailOrPhone } from "../../utils/authentication/LoginUtils";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import PhoneVerification from "../PhoneVerification/PhoneVerification";
import Link from "next/link";

export default function LoginForm() {
    const [credential, setCredential] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [password, setPassword] = useState("");

    const [verificationForm, setVerificationForm] = useState(false);

    const router = useRouter();
    const { setAuth } = useAuth();

    const body = {
        "password": password
    }

    const { mutateAsync: loginUserMutation } = useMutation({
        mutationFn: async () => {
            return await axios.post(
                '/auth/login',
                body
            );
        }
    })

    async function handleSubmit(e) {
        e.preventDefault();
    
        if(DetermineEmailOrPhone(credential)) {
            body['credential'] = credential;
        } else {
            body['credential'] = countryCode + credential;
        }

        try {
            const request = await loginUserMutation();
            console.log(request);

            if(request.status == 200) {
                setAuth({
                    "access_token": request.data.access_token,
                    "loggedIn": true
                });
                
                router.push("/account");
            }
        } catch(error) {
            console.log(error);
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
                <ValidatedInput name={"password"} type={"password"} label={"Contraseña"} placeholder={"Contraseña"} 
                    changeValue={setPassword} autofocus={false} />
                <br/>
                <SubmitButton>Iniciar sesión</SubmitButton>
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