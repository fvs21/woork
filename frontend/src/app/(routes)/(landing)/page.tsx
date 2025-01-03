"use client";

import styles from "./Landing.module.scss";
import Footer from "@/components/Footer/Footer";
import LogotypeWhite from "@/components/Logotype/LogotypeWhite";
import Logotype from "@/components/Logotype/Logotype";
import InputEmailOrPhone from "@/features/login/InputEmailOrPhone";
import ValidatedInput from "@/components/ValidatedInput/ValidatedInput";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { useState } from "react";
import { isEmail } from "@/utils/authentication/LoginUtils";
import { useTheme } from "../../hooks/theme";
import { useLogin } from "@/api/hooks/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingSpinnerClear from "@/components/LoadingSpinnerClear";

export default function Page() {
    const [credential, setCredential] = useState("");
    const [countryCode, setCountryCode] = useState("52");
    const [password, setPassword] = useState("");

    const { login, isLoading } = useLogin();
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await login({
                credential: isEmail(credential) ? credential : countryCode+credential,
                password: password
            });
            router.push("/explore");
        } catch(error){
            router.push("/login?failed=true");
        }
    }

    const [theme] = useTheme();

    return (
        <div className="global-container">
            <title>Woork - Inicio</title>
            <div className={styles['landing-page-container']}>
                <div className={styles['left-container']}>
                    {
                        theme == 'light' ? <Logotype width={"600px"} /> : <LogotypeWhite width={"600px"} />
                    }
                    <br/>
                </div>
                <div className={styles['right-container']}>
                    <div className={styles['woork-about']}>
                        <div className={styles['right-logotype']}>
                            {
                                theme == 'light' ? <Logotype width={"300px"} /> : <LogotypeWhite width={"300px"} />
                            }
                        </div>    
                        Woork conecta a personas que quieran trabajar con personas que requieran un servicio.  
                        <br/><br/>
                        <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                            <Link
                                className={styles['explore-jobs-button']} 
                                href="/explore">
                                Explorar trabajos
                            </Link>
                            <Link 
                                className={styles['about-button']} 
                                href="#">
                                Acerca de Woork
                            </Link>
                        </div>
                    </div>
                    <div className={styles['landing-login-form-container']}>
                        <div className={styles['landing-login-form']}>
                            <form onSubmit={handleSubmit}>
                                <InputEmailOrPhone
                                    className={styles.formInput}
                                    credential={credential}
                                    changeCredential={setCredential}
                                    countryCode={countryCode}
                                    changeCountryCode={setCountryCode}/>
                                <div className={styles['input-field']}>
                                    <ValidatedInput 
                                        name="password"
                                        className={styles.formInput}
                                        type={"password"} 
                                        valid={true} 
                                        placeholder={"Contraseña"} 
                                        value={password}
                                        setValue={setPassword}/>
                                </div>
                                <SubmitButton active={true}>
                                    {isLoading
                                        ? <LoadingSpinnerClear width={"18px"} />
                                        : "Inicia sesión"
                                    }
                                </SubmitButton>
                            </form>   
                            <div style={{textAlign: "center", padding: "14px"}}>
                                <a className={styles['forgot-password']} href="/forgot-password">¿Olvidaste tu contraseña?</a>
                            </div>
                            <hr className="hr-line" />
                            <div style={{textAlign: "center", padding: "10px"}}>
                                <Link className={styles['register-link']} href="/register">Crea tu cuenta</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}