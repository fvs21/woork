import InputLabel from "./InputLabel";
import InputBox from "./InputBox";
import styles from "./ValidatedInput.module.scss";
import { useEffect, useState } from "react";
import { determineInputColor } from "@/utils/authentication/DetermineStylesUtils";
import ErrorCircleSVG from "../SVGs/ErrorCircle";

type ValidatedInputProps = {
    name: string;
    className: string;
    value: string;
    setValue: (value: string) => void;
    valid: boolean;
    type: string;
    label?: string;
    placeholder: string;
    autofocus?: boolean;
    errorMsg?: string;
    [x:string]: any;
};

export default function ValidatedInput(
    {name, className, value, setValue, valid, type, label, placeholder, autofocus, errorMsg, ...props}: ValidatedInputProps
) {
    const [active, setActive] = useState(false);
    const [color, setColor] = useState("");

    const focus = () => {
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
                <input className={`${color} ${className}`} 
                    name={name} 
                    type={type} 
                    placeholder={placeholder} 
                    value={value}
                    onChange={updateValue} 
                    onFocus={focus} 
                    onBlur={focus} 
                    required
                    autoFocus={autofocus}
                    {...props}/>
                {(!active && !valid && errorMsg) && <span className={styles.errorMsg}>
                    <ErrorCircleSVG width={"12px"} color={"rgb(196, 0, 0)"} />
                    { errorMsg }
                </span>}
            </InputBox>
        </>
    )
}