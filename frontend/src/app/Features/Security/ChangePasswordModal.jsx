import Modal from "@/components/Modal/Modal";
import styles from "./SecurityPanel.module.scss";
import CloseSVG from "@/components/SVGs/Close";
import { svgColor } from "@/utils/extra/utils";
import { useState } from "react";
import { validatePassword } from "@/services/validators";
import { flash } from "@/flash-message/flashMessageCreator";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import { useAuthenticatedForgotPassword, useUpdatePassword } from "@/api/hooks/authentication";
import MutationButton from "@/components/MutationButton";

export default function ChangePasswordModal({closeModal}) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [currentPasswordValid, setCurrentPasswordValid] = useState(true);

    const [newPassword, setNewPassword] = useState("");
    const [newPasswordValid, setNewPasswordValid] = useState(true);

    const [reNewPassword, setReNewPassword] = useState("");
    const [reNewPasswordValid, setReNewPasswordValid] = useState(true);
    
    const { update, isLoading, updatePasswordInvalid } = useUpdatePassword();
    const { forgotPassword, forgotPasswordInvalid } = useAuthenticatedForgotPassword();

    const changeCurrentPassword = (value) => {
        setCurrentPassword(value);
        
        if(!currentPasswordValid)
            setCurrentPasswordValid(true);
    }

    const changeNewPassword = (value) => {
        setNewPassword(value);
        setNewPasswordValid(validatePassword(value) || value.length == 0);
    }

    const changeReNewPassword = (value) => {
        setReNewPassword(value);
        setReNewPasswordValid(value == newPassword || value.length == 0);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(currentPassword.length == 0 || newPassword.length == 0 || reNewPassword.length == 0)
            return;

        try {
            await update({
                currentPassword: currentPassword,
                newPassword: newPassword,
                confirmPassword: reNewPassword
            });

            flash("Contraseña actualizada", 3000);
            closeModal(); 
        } catch(error){
            switch(error.response.status) {
                case 400:
                    setCurrentPasswordValid(false);
            }
        }
    }

    async function handleForgotPassword(e) {
        e.preventDefault();
        
        try {
            const request = await forgotPassword();
            const mean = request.data.mean;
            const response = request.data.message;
            
            const message = response + (mean == 'email' ? " Revisa tu correo electrónico." : " Revisa tus mensajes SMSs");
            flash(message, 6000, "success");
        } catch(error) {
            flash(error.response.data.message, 6000, "error");
        }
    }

    return (
        <Modal className={styles.changePasswordModalContainer} handleClose={closeModal}>
            <div className={styles.changePasswordModal}>
                <button className={styles.closeModalBtn} onClick={closeModal}>
                    <CloseSVG width={"22px"} color={svgColor()} />
                </button>
                <div className={styles.changePasswordModalHeader}>
                    <div className={styles.changePasswordModalTitle}>
                        Cambiar contraseña
                    </div>
                    <div className={styles.instructions}>
                        Tu contraseña debe contener al menos 8 caracteres y preferiblemente incluir una combinación de números, letras y caracteres especiales (! $ & %)
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <PasswordInput
                            valid={currentPasswordValid}
                            className={styles.passwordInput}
                            name={"currentPassword"}
                            placeholder={"Contraseña actual"}
                            value={currentPassword}
                            setValue={changeCurrentPassword}
                            errorMsg={"La contraseña que ingresaste no es correcta."}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <PasswordInput
                            valid={newPasswordValid}
                            className={styles.passwordInput}
                            name={"newPassword"}
                            placeholder={"Nueva contraseña"}
                            value={newPassword}
                            setValue={changeNewPassword}
                            errorMsg={"Escoge una contraseña más segura."}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <PasswordInput
                            valid={reNewPasswordValid}
                            className={styles.passwordInput}
                            name={"password_confirmation"}
                            placeholder={"Vuelve a escribir tu nueva constraseña."}
                            value={reNewPassword}
                            setValue={changeReNewPassword}
                            errorMsg={"Las contraseñas no coinciden."}/>
                    </div>
                    <div className={styles.forgotPassword}>
                        <span 
                            className={styles.forgotPasswordBtn}
                            onClick={(e) => handleForgotPassword(e)}>
                                ¿Se te olvido tu contraseña?
                        </span>
                    </div>
                    <div className={styles.submitChangePasswordContainer}>
                        <MutationButton classname={`${styles.submitChangePasswordBtn}`} disable={updatePasswordInvalid}>
                            Cambiar contraseña
                        </MutationButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}