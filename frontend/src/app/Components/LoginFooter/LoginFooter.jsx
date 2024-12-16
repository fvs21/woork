import { Link, router } from "@inertiajs/react";
import styles from "./LoginFooter.module.scss";
import { isEmail } from "@/Utils/authentication/LoginUtils";
import { useState } from "react";
import InputEmailOrPhone from "@/Features/Login/InputEmailOrPhone";
import ValidatedInput from "../ValidatedInput/ValidatedInput";

export default function LoginFooter() {
    const [credential, setCredential] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        router.post("/login", {
            'credential': isEmail(credential) ? credential : countryCode+credential,
            'password': password
        });
    }

    return (
        <div className={styles['login-fixed-container']}>
            <span className={styles['login-title']}>Inicia sesión en Woork</span>
            <form className={styles['form-container']} onSubmit={handleSubmit}>
                <div className={styles['input-containers']}>
                    <div className={styles['input-field']}>
                        <InputEmailOrPhone
                            credential={credential}
                            changeCredential={setCredential}
                            countryCode={countryCode}
                            changeCountryCode={setCountryCode}/>
                    </div>
                    <div className={styles['input-field']}>
                        <ValidatedInput 
                            type={"password"} 
                            valid={true} 
                            placeholder={"Contraseña"} 
                            value={password}
                            setValue={setPassword}/>
                    </div>
                </div>
                <button 
                    type="submit" 
                    className={styles['submit-btn']}>
                        Iniciar sesión
                </button>
            </form>
            <Link href="/login" className={styles['login-link']}>Inicia sesión</Link>
            <span>o</span>
            <Link href="/register " className={styles['register-link']}>Regístrate</Link>
        </div>
    )
}