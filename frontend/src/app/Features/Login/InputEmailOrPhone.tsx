import InputPhone from "@/components/InputPhone/InputPhone";
import ValidatedInput from "@/components/ValidatedInput/ValidatedInput";
import { isEmail } from "@/utils/authentication/LoginUtils";
import { useState } from "react";

type InputEmailOrPhoneProps = {
    className: string;
    credential: string;
    changeCredential: (value: string) => void;
    countryCode: string;
    changeCountryCode: (value: string) => void;
    label?: string;
}

export default function InputEmailOrPhone({className, credential, changeCredential, countryCode, changeCountryCode, label}: InputEmailOrPhoneProps) {
    const [active, setActive] = useState(false);

    if(isEmail(credential)) {
        return (
            <ValidatedInput 
                className={className} 
                valid={true} 
                name={"email"} 
                type={"email"} 
                label={label} 
                placeholder={"Correo electrónico o número de teléfono"} 
                value={credential} 
                setValue={changeCredential} 
                autofocus={active}/>
        )
    } else {
        if(!active) { setActive(true); } //set email autofocus to true

        return (
            <InputPhone 
                className={className} 
                valid={true} 
                label={label} 
                number={credential} 
                changeNumber={changeCredential} 
                countryCode={countryCode} 
                changeCountryCode={changeCountryCode} 
                autofocus={true} />
        )
    }
}