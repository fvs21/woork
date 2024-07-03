import { useState } from "react";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useResendEmailCode, useVerifyEmail } from "../../hooks/authentication";
import Modal from "../../components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import { INCORRECT_VERIFICATION_CODE_ERROR, VERIFICATION_CODE_EXPIRED_ERROR, VERIFICATION_CODE_REFRESH_TIME_ERROR } from "../../utils/authentication/RegistrationErrorResponses";
import CloseSVG from "../../components/SVGs/Close";
import { useUser } from "../../hooks/useUser";
import "../../assets/globals.scss";

export default function EmailVerification({changeDisplayModal, notVerified, editEmail}) {
    const user = useUser();
    const [code, setCode] = useState("");
    const [codeValid, setCodeValid] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [emailSentMsg, setEmailSentMsg] = useState("");

    const { resendEmailCodeFn } = useResendEmailCode();

    const { verifyEmailFn } = useVerifyEmail({
        "otp": code
    });

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await verifyEmailFn();
            changeDisplayModal(false);
        } catch(error) {
            console.log(error.response.data);
            switch(error.response.data) {
                case INCORRECT_VERIFICATION_CODE_ERROR:
                    setErrorMsg("Código de verificación incorrecto.");
                    break;
                case VERIFICATION_CODE_EXPIRED_ERROR:
                    setErrorMsg("El código de verifación expiró.");
                    break;
            }
        }
    }

    function changeCode(value) {
        setCode(value);

        setCodeValid(value.length >= 7);
    }

    async function resendCode() {
        try {
            await resendEmailCodeFn();
            setErrorMsg("");
            setEmailSentMsg("Código de verificación enviado.")
        } catch(error) {
            switch(error.response.data) {
                case VERIFICATION_CODE_REFRESH_TIME_ERROR:
                    setErrorMsg("Espera unos segundos antes de solicitar otro código de verificación.");
                    break;
            }
        }
    }

    return (
        <Modal>
            <div className={styles['contact-modal']}>
                <div className={styles['contact-modal-title']}>
                    <button className={styles['cancel-btn']}
                        onClick={() => changeDisplayModal(false)}>
                        <CloseSVG width={"20px"} />
                    </button>
                    <h2>Verifica tu correo electrónico</h2>
                </div>
                <div className={styles['modal-desc']}>
                    <span>
                        Ingresa el código de verificación que enviamos a {user.email}.&nbsp;
                        <button onClick={() => resendCode()} className={styles['edit-email-btn']}>Re-enviar</button>
                        {" - "} { notVerified && <button className={styles['edit-email-btn']} onClick={() => {editEmail()}}>Cambiar correo electrónico.</button>}
                    </span>
                </div>
                <br/>
                <form onSubmit={handleSubmit}>
                    <ValidatedInput valid={codeValid} name={"verificationCode"} type={"text"}
                        placeholder={"Código de verificación"} setValue={changeCode} autofocus={false}/>
                    { errorMsg && <span className='error-msg'>{errorMsg}</span> }
                    { emailSentMsg && <span className="success-msg">{emailSentMsg}</span>}
                    <br/>
                    <br/>
                    <SubmitButton active={codeValid}>Verificar</SubmitButton>
                </form>
            </div>
        </Modal>
    )
}