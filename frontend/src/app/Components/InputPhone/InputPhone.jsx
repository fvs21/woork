import styles from "./InputPhone.module.scss";
import ValidatedInput from "../ValidatedInput/ValidatedInput";

export default function InputPhone({className, countryCode, number, changeCountryCode, changeNumber, label, valid, autofocus}) {
    return (
        <div>
            {label && <label className={`${styles["input-label"]}`}>{label}</label>}
            <div className={styles["input-container"] }>
                <select name="countryCode" className={`${styles['select-form']}`} required defaultValue={countryCode}
                    onChange={(e) => changeCountryCode(e.target.value)}>
                    <option value="" disabled>País/Región</option>
                    <option value="52">+52</option>
                </select>                    
                <ValidatedInput 
                    className={className}
                    valid={valid} 
                    name={"phone"} 
                    type={"text"} 
                    placeholder={"Número de teléfono"}
                    value={number} 
                    setValue={changeNumber} 
                    autofocus={autofocus} />
            </div>
        </div>
    )
}