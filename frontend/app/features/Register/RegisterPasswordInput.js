import { useState } from "react"
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput"
import "../../assets/globals.scss";
import { validatePassword } from "../../services/Validators";

export default function RegisterPasswordInput({password, setPassword, errorMsg}) {
    const [passwordValid, setPasswordValid] = useState(true);

    const changePassword = (value) => {
        setPassword({
            ...password,
            value: value
        });

        setPasswordValid(validatePassword(value));
    }

    return (
        <>
            <ValidatedInput name={"password"} valid={passwordValid} value={password.value} type={"password"} label={"Contraseña"} placeholder={"Contraseña"} 
                setValue={changePassword} />
            {errorMsg && <span className="error-msg">{errorMsg}</span>}
        </>
    )
} 