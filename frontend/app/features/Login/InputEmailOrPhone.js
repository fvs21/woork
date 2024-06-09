import { DetermineEmailOrPhone } from '../../utils/authentication/LoginUtils'
import InputPhone from '../../components/InputPhone/InputPhone'
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import { useState } from "react";

export default function InputEmailOrPhone({credential, changeCredential, countryCode, changeCountryCode}) {
    const label = "Ingresa un correo electrónico o número de teléfono";

    const [active, setActive] = useState(false);

    if(DetermineEmailOrPhone(credential)) {
        return (
            <ValidatedInput name={"email"} type={"email"} label={label} placeholder={"Correo electrónico o número de teléfono"} 
                value={credential} changeValue={changeCredential} autofocus={active}/>
        )
    } else {
        if(!active) { setActive(true); } //set email autofocus to true

        return (
            <InputPhone label={label} number={credential} changeNumber={changeCredential} countryCode={countryCode} 
                changeCountryCode={changeCountryCode} autofocus={true} />
        )
    }
}