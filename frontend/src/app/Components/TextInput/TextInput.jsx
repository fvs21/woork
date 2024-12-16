import InputLabel from "../ValidatedInput/InputLabel";
import styles from "./TextInput.module.scss";

export default function TextInput({name, value, setValue, label, placeholder, className, type, ...props}) {
    const changeValue = (e) => {
        setValue(e.target.value);
    }

    return (
        <div style={{width: "100%"}}>
            {label && <InputLabel>{label}</InputLabel>}
            <input 
                name={name}
                type={type}
                className={`${styles.input} ${className}`} 
                value={value}
                onChange={(e) => changeValue(e)}
                placeholder={placeholder}
                required
                {...props}/>
        </div>
    )
}