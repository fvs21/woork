import InputLabel from "./InputLabel";
import InputBox from "./InputBox";
import styles from "./ValidatedInput.module.scss";
import { useEffect, useState } from "react";
import "../../assets/globals.scss";
import { determineInputColor } from "../../utils/authentication/DetermineStylesUtils";

export default function ValidatedInput({name, value, valid, type, label, placeholder, setValue, autofocus}) {
    const [active, setActive] = useState(false);
    const [color, setColor] = useState("normal-border")

    const focus = (event) => {
        setActive(!active);
    }

    const updateValue = (event) => {
        setValue(event.target.value);
    } 

    useEffect(() => {
        setColor(determineInputColor(active, valid));
    }, [value, valid, active]);

    return (
        <>
            <InputBox>
                {label && <InputLabel>{label}</InputLabel>}
                <input className={`${styles['form-input']} ${color}`} 
                    name={name} type={type} placeholder={placeholder} defaultValue={value}
                    onChange={updateValue} onFocus={focus} onBlur={focus} autoFocus={autofocus} required/>
            </InputBox>
        </>
    )
}