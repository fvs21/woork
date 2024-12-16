import styles from "./Registration.module.scss";
import ValidatedInput from "@/Components/ValidatedInput/ValidatedInput";
import { useState } from "react";
import { validateString } from "@/Services/validators";

export default function RegisterNameInput({fullName, setName}) {
    const [firstValid, setFirstValid] = useState(true);
    const [lastValid, setLastValid] = useState(true);

    //const {errors} = usePage().props;

    const changeFirstName = (value) => {
        setName(prevState => ({
            ...prevState,
            firstName: value
        }));

        setFirstValid(validateString(value));
    }
    const changeLastName = (value) => {
        setName(prevState => ({
            ...prevState,
            lastName: value
        })); 

        setLastValid(validateString(value));                                                                                                                                                          
    }

    return (
        <div className={styles['input-field']}>
            <div className={styles["fullname-field"]}>
                <ValidatedInput
                    className={styles.formInput} 
                    valid={firstValid && !fullName.firstError} 
                    name={"firstName"} value={fullName.firstName} 
                    type={"text"} 
                    placeholder={"Nombre"} 
                    setValue={changeFirstName} 
                    autofocus={false} />
                <ValidatedInput 
                    className={styles.formInput}
                    valid={lastValid && !fullName.lastError} 
                    name={"lastName"} 
                    value={fullName.lastName} 
                    type={"text"} 
                    placeholder={"Apellido(s)"} 
                    setValue={changeLastName} 
                    autofocus={false}/>
            </div>
            { false && <span className="error-msg">{errors.firstName}</span>}
        </div>
    )
}