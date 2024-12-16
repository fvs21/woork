import { useState } from "react"
import { validatePassword } from "@/Services/validators";
import styles from "./Registration.module.scss";
import PasswordInput from "@/Components/PasswordInput/PasswordInput";

export default function RegisterPasswordInput({password, setPassword}) {
    const [passwordValid, setPasswordValid] = useState(true);

    //const errorMsg = usePage().props.errors?.password;

    const changePassword = (value) => {
        setPassword({
            ...password,
            value: value
        });

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
                setValue={changePassword} />
            {false && <span className="error-msg">{errorMsg}</span>}
        </div>
    )
} 