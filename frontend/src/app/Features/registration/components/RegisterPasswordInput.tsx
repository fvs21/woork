import React, { useState } from "react"
import { validatePassword } from "@/services/validators";
import styles from "./Registration.module.scss";
import PasswordInput from "@/components/PasswordInput/PasswordInput";

type RegisterPasswordInputProps = {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function RegisterPasswordInput({password, setPassword}: RegisterPasswordInputProps) {
    const [passwordValid, setPasswordValid] = useState(true);

    const changePassword = (value: string) => {
        setPassword(value);

        setPasswordValid(validatePassword(value));
    }

    return (
        <div className={styles['input-field']}>
            <PasswordInput 
                className={styles.formInput}
                name={"password"} 
                valid={passwordValid} 
                value={password} 
                label={"Contraseña"} 
                placeholder={"Contraseña"} 
                setValue={changePassword}
            />
        </div>
    )
} 