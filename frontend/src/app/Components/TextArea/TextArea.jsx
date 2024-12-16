import InputLabel from "@/Components/ValidatedInput/InputLabel";
import styles from "./TextArea.module.scss";
import { useState } from "react";

export default function TextArea({name, label, value, setValue, required, maxLength, placeholder, className, ...props}) {
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