import { useState } from "react";
import ValidatedInput from "@/Components/ValidatedInput/ValidatedInput";
import SubmitButton from "@/Components/SubmitButton/SubmitButton";
import Modal from "@/Components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import CloseSVG from "@/Components/SVGs/Close";
import "../../../css/globals.scss";
import { svgColor } from "@/Utils/extra/utils";

export default function EmailVerification({closeModal, notVerified, editEmail, user, setUser}) {
    const [code, setCode] = useState("");
    const [codeValid, setCodeValid] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [emailSentMsg, setEmailSentMsg] = useState("");


    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await axios.post("verify-email", {
                'otp': code
            });
            setUser({
                ...user,
                email_verified: true
            })
            closeModal();
        } catch(error) {
            setErrorMsg(error.response.data.message);
        }
    }

    function changeCode(value) {
        setCode(value);

        setCodeValid(value.length >= 7);
    }

    async function resendCode() {
        try {
            await axios.post("verify-email/resend");
            setErrorMsg("");
            setEmailSentMsg("Código de verificación enviado.")
        } catch(error) {
            console.log(error);
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
                    { errorMsg && <span className='error-msg'>{errorMsg}</span> }
                    { emailSentMsg && <span className="success-msg">{emailSentMsg}</span>}
                    <br/>
                    <br/>
                    <SubmitButton active={code.length >= 7}>Verificar</SubmitButton>
                </form>
            </div>
        </Modal>
    )
}