import InputLabel from "@/components/ValidatedInput/InputLabel";
import styles from "./TextArea.module.scss";
import { ChangeEvent } from "react";

type TextAreaProps = {
    name?: string;
    label?: string;
    value: string;
    setValue: (value: string) => void;
    required?: boolean;
    maxLength: number;
    placeholer?: string;
    className: string;
    [x:string]: any;
}

export default function TextArea({name, label, value, setValue, required = true, maxLength, placeholder, className, ...props}: TextAreaProps) {
    const updateValue = (event) => {
        setValue(event.target.value);
    } 

    const input = (e) => {
        e.target.style.height = "";
        e.target.style.height = e.target.scrollHeight + "px";
    }

    return (
        <div>
            {label && <InputLabel>{label}</InputLabel>}
            <textarea 
                name={name} 
                className={`${styles['text-area']} ${className}`} 
                value={value} 
                onChange={updateValue}
                required={required}
                maxLength={maxLength}
                placeholder={placeholder}
                onInput={input}
                {...props}/>
        </div>
    )
}