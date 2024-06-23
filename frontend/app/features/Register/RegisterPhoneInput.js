import { useState } from "react"
import InputPhone from "../../components/InputPhone/InputPhone";
import { validatePhoneNumber } from "../../services/Validators";

export default function RegisterPhoneInput({phoneNumber, setPhoneNumber, errorMsg}) {
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);

    const changeNumber = (value) => {
        setPhoneNumber({
            ...phoneNumber,
            phone: value
        });

        setPhoneNumberValid(validatePhoneNumber(value));
    }
    const changeCountryCode = (value) => {
        setPhoneNumber({
            ...phoneNumber,
            countryCode: value
        });
    }
    return (
        <>
            <InputPhone valid={phoneNumberValid} countryCode={phoneNumber.countryCode} number={phoneNumber.number} changeNumber={changeNumber} changeCountryCode={changeCountryCode}
                label={"Número de teléfono"} autofocus={false} errorMsg={phoneNumber.errorMsg}/>
            {errorMsg && <span className="error-msg">{errorMsg}</span>}
        </>
    )
}