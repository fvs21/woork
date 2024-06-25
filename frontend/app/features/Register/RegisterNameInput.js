import styles from "./RegisterForm.module.scss";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import { useState } from "react";
import { validateName } from "../../services/Validators";
import "../../assets/globals.scss";

export default function RegisterNameInput({firstName, lastName, setFullName, errorMsg}) {
    const [firstValid, setFirstValid] = useState(true);
    const [lastValid, setLastValid] = useState(true);

    const changeFirstName = (value) => {
        setFullName(prevState => ({
            ...prevState,
            firstName: value
        }));

        setFirstValid(validateName(value));
    }
    const changeLastName = (value) => {
        setFullName(prevState => ({
            ...prevState,
            lastName: value
        }));

        setLastValid(validateName(value));                                                                                                                                                          
    }

    return (
        <>
            <div className={styles["fullname-field"]}>
                <ValidatedInput valid={firstValid} name={"firstName"} value={firstName} type={"text"} placeholder={"Nombre"} setValue={changeFirstName} autofocus={false} />
                <ValidatedInput valid={lastValid} name={"lastName"} value={lastName} type={"text"} placeholder={"Apellido"} setValue={changeLastName} autofocus={false}/>
            </div>
            { errorMsg && <span className="error-msg">{errorMsg}</span>}
        </>
    )
}