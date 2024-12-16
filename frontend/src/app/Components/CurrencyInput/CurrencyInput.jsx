import InputBox from "../ValidatedInput/InputBox";
import InputLabel from "../ValidatedInput/InputLabel";
import styles from "./CurrencyInput.module.scss";
import { useState } from "react";

export default function CurrencyInput({label, value, setValue, name, className}) {
    const currency = "USD";
    const [string, setString] = useState("");

    const localStringToNumber = (string) => {
        return Number( String(string).replace(/[^0-9.-]+/g, "") );
    }

    const focus = (e) => {
        let val = e.target.value;
        setString(val ? localStringToNumber(val) : '');
    }

    const blur = (e) => {
        let val = e.target.value;

        const options = {
            maximumFractionDigits: 2,
            currency: currency,
            style: "currency",
            currencyDisplay: "symbol"
        }

        setString(( val || val === 0) ?
            localStringToNumber(val).toLocaleString(undefined, options) : '');

    }

    function changeValue(e) {
        const val = e.target.value;
        if(!/^(0|[1-9][0-9]{0,2})*(\.|\.\d{1,2})?$/.test(val) && val != "") {
            e.target.value = value;
            return;
        }
        setValue(val);
        setString(val);
    }

    return (
        <InputBox>
            {label && <InputLabel>{label}</InputLabel>}
            <input 
                name={name} 
                placeholder="$MXN"
                className={`${styles['currency-input']} ${className}`} 
                type="currency" 
                value={string} 
                onFocus={focus}
                onBlur={blur}
                onChange={changeValue}/>
        </InputBox>
    )
}