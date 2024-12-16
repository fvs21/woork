import { useState } from "react"
import InputPhone from "@/Components/InputPhone/InputPhone";
import { validatePhoneNumber } from "@/Services/validators";
import styles from "./Registration.module.scss";

export default function RegisterPhoneInput({phoneNumber, setPhoneNumber}) {
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);

    //const errorMsg = usePage().props.errors?.phone || "";

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
                valid={phoneNumberValid} 
                countryCode={phoneNumber.countryCode} 
                number={phoneNumber.phone} 
                changeNumber={changeNumber} 
                changeCountryCode={changeCountryCode}
                label={"Número de teléfono"} 
                autofocus={false} 
                errorMsg={""}/>
            {false && <span className="error-msg">{errorMsg}</span>}
        </div>
    )
}