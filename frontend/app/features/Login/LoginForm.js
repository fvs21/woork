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
                setAuth(request.data);
                
                if(request.data.user.verified) {
                    router.push('/');
                } else {
                    setVerificationForm(true);
                }
            }
        } catch(error) {
            console.log(error);
        }
    }

    if(!verificationForm) {
        return (
            <>
                <div className={styles['form-title']}>
                    <h2>Inicia sesión en woork</h2>
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
                        <a href="/register">No tienes una cuenta?</a>
                    </span>
                </div>
            </>
        )
    } else {
        return (
            <PhoneVerification />
        )
    }
    
}