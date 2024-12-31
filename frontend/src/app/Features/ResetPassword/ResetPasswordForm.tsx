"use client";

import Form from "@/components/Form/Form";
import styles from "./ResetPasswordForm.module.scss";
import { useState } from "react";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { validatePassword } from "@/services/validators";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import { useResetPassword } from "@/api/hooks/authentication";
import { useRouter } from "next/navigation";
import { flash } from "@/flash-message/flashMessageCreator";

export default function ResetPasswordForm({credential, token}) {
    const [newPassword, setNewPassword] = useState("");
    const [validNewPassword, setValidNewPassword] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);

    const [submitActive, setSubmitActive] = useState(false);
 
    const { resetPassword, isLoading, resetPasswordInvalid } = useResetPassword();

    const [errorMsg, setErrorMsg] = useState("");

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await resetPassword({
                token: token,
                credential: credential,
                password: newPassword,
                confirmPassword: confirmPassword
            });
            flash("Contraseña cambiada. Redirigiendote...", 3000, "success");
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch(error) {
            setErrorMsg(error.response.data.message);
        }
    }

    const changeNewPassword = (value) => {
        setNewPassword(value);

        setValidNewPassword(validatePassword(value) || value == "");

        if(!validConfirmPassword && validatePassword(value) || value == "") {
            if(value == confirmPassword)
                setValidConfirmPassword(true);
        }
        setSubmitActive((value == confirmPassword) && (value != ""));
    }


    const changeConfirmPassword = (value) => {
        setConfirmPassword(value);

        setValidConfirmPassword(value == newPassword || value == "");

        setSubmitActive(newPassword == value && (value != ""));
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
                            name={"newPassword"}
                            className={styles.formInput}
                            label={"Nueva contraseña"}
                            valid={validNewPassword}
                            value={newPassword}
                            setValue={changeNewPassword}
                            placeholder={"Elige tu nueva contraseña"} />
                    </div>
                    <div className={styles['input-field']}>
                        <PasswordInput
                            name={"confirmPassword"}
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
                        <SubmitButton active={submitActive && !resetPasswordInvalid}>Cambiar contraseña</SubmitButton>
                    </div>
                </form>
                {errorMsg && 
                    <div style={{marginTop: "0.25rem"}}>
                        <span className="error-msg">{errorMsg}</span>
                    </div>
                }
            </div>
        </Form>
    );
}