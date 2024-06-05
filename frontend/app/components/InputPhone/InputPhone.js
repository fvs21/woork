import styles from "./InputPhone.module.scss";
import ValidatedInput from "../ValidatedInput/ValidatedInput";

export default function InputPhone({countryCode, changeCountryCode, number, changeNumber, autofocus, label}) {
    return (
        <>
            <label className={styles["input-label"]}>{label}</label>
            <div className={styles["input-container"]}>
                <select name="country_code" className={`${styles['select-form']}`} required defaultValue={countryCode}
                    onChange={(e) => changeCountryCode(e.target.value)}>
                    <option value="" disabled>País/Región</option>
                    <option value="52">+52</option>
                    <option value="1">+1</option>
                </select>                    
                <ValidatedInput name={"phone"} type={"text"} placeholder={"Número de teléfono"} value={number} changeValue={changeNumber} 
                    autofocus={autofocus} />
            </div>
        </>
    )
}