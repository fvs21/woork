import styles from "./RegisterForm.module.scss";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import { useState } from "react";
import { validateName } from "../../services/Validators";

export default function RegisterNameInput({firstName, setFirstName, lastName, setLastName, errorMsg}) {
    const [firstValid, setFirstValid] = useState(true);
    const [lastValid, setLastValid] = useState(true);

    const changeFirstName = (value) => {
        setFirstName({
            ...firstName,
            value: value
        });

        setFirstValid(validateName(value));
    }
    const changeLastName = (value) => {
        setLastName({
            ...lastName,
            value: value
        });

        setLastValid(validateName(value));                                                                                                                                                          
    }

    return (
        <div className={styles["fullname-field"]}>
            <ValidatedInput valid={firstValid} name={"firstName"} value={firstName} type={"text"} placeholder={"Nombre"} setValue={changeFirstName} autofocus={false} />
            <ValidatedInput valid={lastValid} name={"lastName"} value={lastName} type={"text"} placeholder={"Apellido"} setValue={changeLastName} autofocus={false}/>
        </div>
    )
}