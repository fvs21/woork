import InputLabel from "../ValidatedInput/InputLabel";
import styles from "./TextInput.module.scss";

type TextInputProps = {
    name: string;
    value: string;
    setValue: (value: string) => void;
    label?: string;
    className: string;
    type: string;
    [x:string]: any;
}

export default function TextInput({name, value, setValue, label, placeholder, className, type, ...props}: TextInputProps) {
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