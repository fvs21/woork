import { useState } from "react";
import ValidatedInput from "@/components/ValidatedInput/ValidatedInput";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import Modal from "@/components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import CloseSVG from "@/components/SVGs/Close";
import { svgColor } from "@/utils/extra/utils";
import { useUser } from "@/api/hooks/user";
import { useResendEmailVerificationCode, useVerifyEmail } from "@/api/hooks/authentication";
import { flash } from "@/flash-message/flashMessageCreator";

export default function EmailVerification({closeModal, notVerified, editEmail}) {
    const [user] = useUser();

    const [code, setCode] = useState("");
    const [codeValid, setCodeValid] = useState(true);

    const { verify, isLoading } = useVerifyEmail();
    const { resend } = useResendEmailVerificationCode();


    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await verify({
                'otp': code
            });
            closeModal();
            flash("Correo electrónico verificado.");
        } catch(error) {
            flash(error.response.data.message, 4000, "error");
        }
    }

    function changeCode(value) {
        setCode(value);

        setCodeValid(value.length >= 7);
    }

    async function resendCode() {
        try {
            await resend();
            flash("Código de verificación enviado.", 4000, "success");
        } catch(error) {
            flash(error.response.data.message, 4000, "error");
        }
    }

    return (
        <Modal className={styles.contactModal}>
            <div className={styles.contactModalContainer}>
                <div className={styles['contact-modal-title']}>
                    <button className={styles['cancel-btn']}
                        onClick={closeModal}>
                        <CloseSVG width={"20px"} color={svgColor()}/>
                    </button>
                    <h2>Verifica tu correo electrónico</h2>
                </div>
                <div className={styles['modal-desc']}>
                    <span>
                        Ingresa el código de verificación que enviamos a {user?.email}.&nbsp;
                        <button onClick={() => resendCode()} className={styles['edit-email-btn']}>
                            Re-enviar
                        </button>
                        {" - "} 
                        { notVerified && <button className={styles['edit-email-btn']} onClick={() => {editEmail()}}>Cambiar correo electrónico.</button>}
                    </span>
                </div>
                <br/>
                <form onSubmit={handleSubmit}>
                    <ValidatedInput 
                        className={styles.formInput}
                        valid={codeValid} 
                        name={"verificationCode"} 
                        type={"text"}
                        placeholder={"Código de verificación"} 
                        setValue={changeCode} 
                        autofocus={false}
                    />
                    <br/>
                    <br/>
                    <SubmitButton active={code.length >= 7}>Verificar</SubmitButton>
                </form>
            </div>
        </Modal>
    )
}