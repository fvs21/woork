import InputPhone from "@/Components/InputPhone/InputPhone";
import ValidatedInput from "@/Components/ValidatedInput/ValidatedInput";
import { isEmail } from "@/Utils/authentication/LoginUtils";
import { useState } from "react";

export default function InputEmailOrPhone({className, credential, changeCredential, countryCode, changeCountryCode, label}) {
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