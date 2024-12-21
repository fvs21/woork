import styles from "./InputPhone.module.scss";
import { useState } from "react";

export default function InputPhone({className, countryCode, number, changeCountryCode, changeNumber, label, valid, autofocus}) {
    const [phoneFocus, setPhoneFocus] = useState(false);
    const [countryCodeFocus, setCountryCodeFocus] = useState(false);

    const focusPhone = () => setPhoneFocus(!phoneFocus);
    const focusCode = () => setCountryCodeFocus(!countryCodeFocus);

    const focus = phoneFocus || countryCodeFocus;

    const countryCodeColor = (!valid && !focus) ? "error-border" : (countryCodeFocus ? "purple-border" : "");
    const phoneNumberColor = (!valid && !focus) ? "error-border" : (phoneFocus ? "purple-border" : "");

    const setValue = (e) => {
        changeNumber(e.target.value);
    }

    return (
        <div>
            {label && <label className={`${styles["input-label"]}`}>{label}</label>}
            <div className={styles["input-container"] }>
                <select name="countryCode" className={`${styles['select-form']} ${countryCodeColor}`} required defaultValue={countryCode}
                    onChange={(e) => changeCountryCode(e.target.value)} onFocus={focusCode} onBlur={focusCode}>
                    <option value="" disabled>País/Región</option>
                    <option value="52">+52</option>
                </select>                    
                <input 
                    className={`${className} ${phoneNumberColor}`}
                    name={"phone"} 
                    type={"text"} 
                    placeholder={"Número de teléfono"}
                    value={number} 
                    onChange={setValue} 
                    autoFocus={autofocus} 
                    onFocus={focusPhone}
                    onBlur={focusPhone}
                />
            </div>
        </div>
    )
}