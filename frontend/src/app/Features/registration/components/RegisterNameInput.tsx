import styles from "./Registration.module.scss";
import ValidatedInput from "@/components/ValidatedInput/ValidatedInput";
import React, { Dispatch, useState } from "react";
import { validateString } from "@/services/validators";
import { Fullname } from "../types";

type RegisterNameInputProps = {
    fullName: Fullname;
    setName: Dispatch<React.SetStateAction<Fullname>>;
}

export default function RegisterNameInput({fullName, setName}: RegisterNameInputProps) {
    const [firstValid, setFirstValid] = useState(true);
    const [lastValid, setLastValid] = useState(true);

    const changeFirstName = (value: string) => {
        setName(prevState => ({
            ...prevState,
            firstName: value
        }));

        setFirstValid(validateString(value));
    }
    const changeLastName = (value: string) => {
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
                    valid={firstValid} 
                    name={"firstName"} value={fullName.firstName} 
                    type={"text"} 
                    placeholder={"Nombre(s)"} 
                    setValue={changeFirstName} 
                    autofocus={false} />
                <ValidatedInput 
                    className={styles.formInput}
                    valid={lastValid} 
                    name={"lastName"} 
                    value={fullName.lastName} 
                    type={"text"} 
                    placeholder={"Apellido(s)"} 
                    setValue={changeLastName} 
                    autofocus={false}/>
            </div>
        </div>
    )
}