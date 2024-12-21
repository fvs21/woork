import { useState } from "react"
import InputPhone from "@/components/InputPhone/InputPhone";
import { validatePhoneNumber } from "@/services/validators";
import styles from "./Registration.module.scss";
import { usePhoneNumberError } from "@/jotai/registration/registrationState";

export default function RegisterPhoneInput({phoneNumber, setPhoneNumber}) {
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);

    const [error] = usePhoneNumberError();

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
        <div className={styles['input-field']} >
            <InputPhone
                className={styles.formInput} 
                valid={phoneNumberValid && !error} 
                countryCode={phoneNumber.countryCode} 
                number={phoneNumber.phone} 
                changeNumber={changeNumber} 
                changeCountryCode={changeCountryCode}
                label={"Número de teléfono"} 
                autofocus={false} 
                errorMsg={""} />
            {error && <span className="error-msg">{error}</span>}
        </div>
    )
}