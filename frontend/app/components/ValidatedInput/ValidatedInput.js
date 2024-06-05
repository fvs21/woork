import InputLabel from "./InputLabel";
import InputBox from "./InputBox";
import styles from "./ValidatedInput.module.scss";
import { useState } from "react";
import "../../assets/globals.scss"
import { determineInputColor } from "../../utils/authentication/DetermineStylesUtils";

export default function ValidatedInput({name, value, type, label, placeholder, errorMsg, changeValue, autofocus}) {
    const [validateState, setValidatedState] = useState({
        active: false,
        valid: true,
        typedIn: false,
        value: ''
    });

    const focus = (event) => {
        setValidatedState({
            ...validateState,
            active: !validateState.active,
        });
    }

    const updateValue = (event) => {
        setValidatedState({
            ...validateState,
            typedIn: true,
            value: event.target.value,
            valid: event.target.value != ""
        })

        changeValue(event.target.value);
    }

    return (
        <>
            {label && <InputLabel>{label}</InputLabel>}
            <InputBox>
                <input className={`${styles['form-input']} ${determineInputColor(validateState)}`} name={name} type={type} placeholder={placeholder} defaultValue={value}
                    onChange={(e) => updateValue(e)} onFocus={focus} onBlur={focus} autoFocus={autofocus} required/>
                {errorMsg && <span className={styles['error-msg']}>{errorMsg}</span>}
            </InputBox>
        </>
    )
}