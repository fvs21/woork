"use client";

import styles from "./Landing.module.scss";
import Footer from "@/Components/Footer/Footer";
import LogotypeWhite from "@/Components/Logotype/LogotypeWhite";
import Logotype from "@/Components/Logotype/Logotype";
import InputEmailOrPhone from "@/Features/Login/InputEmailOrPhone";
import ValidatedInput from "@/Components/ValidatedInput/ValidatedInput";
import SubmitButton from "@/Components/SubmitButton/SubmitButton";
import { useState } from "react";
import { isEmail } from "@/Utils/authentication/LoginUtils";
import { useTheme } from "../../Hooks/theme";
import { loginUser } from "@/Services/auth";
import Link from "next/link";

export default function LandingPage() {
    const [credential, setCredential] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        loginUser(
            isEmail(credential) ? credential : countryCode+credential,
            password
        );
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
                                        className={styles.formInput}
                                        type={"password"} 
                                        valid={true} 
                                        placeholder={"Contraseña"} 
                                        value={password}
                                        setValue={setPassword}/>
                                </div>
                                <SubmitButton active={true}>
                                    <span style={{fontWeight: 600, fontSize: "16px"}}>
                                        Inicia sesión
                                    </span>
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