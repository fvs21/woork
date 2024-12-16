import Form from "@/Components/Form/Form";
import styles from "./ResetPasswordForm.module.scss";
import { useState } from "react";
import SubmitButton from "@/Components/SubmitButton/SubmitButton";
import { validatePassword } from "@/Services/validators";
import { router } from "@inertiajs/react";
import PasswordInput from "@/Components/PasswordInput/PasswordInput";

export default function ResetPasswordForm({credential, token}) {
    const [newPassword, setNewPassword] = useState("");
    const [validNewPassword, setValidNewPassword] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);

    const [submitActive, setSubmitActive] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
    }

    const changeNewPassword = (value) => {
        setNewPassword(value);

        setValidNewPassword(validatePassword(value) || value == "");

        if(!validConfirmPassword && validatePassword(value) || value == "")
            if(value == confirmPassword)
                setValidConfirmPassword(true);

        setSubmitActive((value == confirmPassword) && (value != ""));
    }


    const changeConfirmPassword = (value) => {
        setConfirmPassword(value);

        setValidConfirmPassword(value == newPassword || value == "");

        setSubmitActive(newPassword == value && (value != ""));
    }

    function handleSubmit(e) {
        e.preventDefault();

        router.post("/reset-password", {
            token: token,
            credential: credential,
            password: newPassword,
            password_confirmation: confirmPassword
        });
    }

    return (
        <Form className={styles.resetPasswordFormContainer}> 
            <div className={styles['reset-password-form']}>
                <div className={styles['form-title']}>
                    Elige tu nueva contraseña
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles['input-field']}>
                        <PasswordInput
                            className={styles.formInput}
                            label={"Nueva contraseña"}
                            valid={validNewPassword}
                            value={newPassword}
                            setValue={changeNewPassword}
                            placeholder={"Elige tu nueva contraseña"} />
                    </div>
                    <div className={styles['input-field']}>
                        <PasswordInput
                            className={styles.formInput}
                            label={"Confirma tu nueva contraseña"}
                            valid={validConfirmPassword}
                            value={confirmPassword}
                            setValue={changeConfirmPassword}
                            placeholder={"Vuelve a escribir tu nueva contraseña"} 
                            errorMsg={"Las contraseñas no coinciden."}/>
                        </div>
                    <span className={styles['disclaimer']}>La contraseña debe contener al menos 8 caracteres.</span>
                    <div style={{paddingTop: "12px"}}>
                        <SubmitButton active={submitActive}>Cambiar contraseña</SubmitButton>
                    </div>
                </form>
            </div>
        </Form>
    );
}