import Modal from "@/components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import { useState } from "react";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import ValidatedInput from "@/components/ValidatedInput/ValidatedInput";
import EmailVerification from "./EmailVerification";
import CloseSVG from "@/components/SVGs/Close";
import { validateEmail } from "@/services/validators";
import { api } from "@/api/axios";
import { svgColor } from "@/utils/extra/utils";
import { useUser } from "@/api/hooks/user";
import { useUpdateEmail } from "@/api/hooks/authentication";

export default function EmailModal({closeModal}) {
    const [user] = useUser();

    const [email, setEmail] = useState(user?.email || "");
    const [emailValid, setEmailValid] = useState(true);
    const notVerified = user?.email && !user?.emailVerified;
    const [step, setStep] = useState(notVerified ? 1 : 0);
    const [error, setError] = useState("");

    const { updateEmail, isLoading } = useUpdateEmail();

    const body = {
        "email": email
    };

    function changeEmail(email) {
        setEmail(email);
        setEmailValid(validateEmail(email) && email);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if(email == user?.email) {
            return;
        }

        try {
            setError("");
            await updateEmail(body);
            setStep(1);
        } catch(error) {
            console.log(error);
            
            setError(error.response.data.message);
        }
    }


    if(step == 0) {
        return (
            <Modal className={styles.contactModal} handleClose={closeModal}>
                <div className={styles.contactModalContainer}>
                    <div className={styles['contact-modal-title']}>
                        <button className={styles['cancel-btn']}
                            onClick={closeModal}>
                            <CloseSVG width={"20px"} color={svgColor()}/>
                        </button>
                        <h2>Correo electrónico</h2>
                    </div>
                    <div className={styles['modal-desc']}>
                        <div>Agregar un correo electrónico te puede ayudar a recuperar tu cuenta en caso de no tener acceso a tu teléfono.</div>
                    </div>
                    <form className={styles['form-container']} onSubmit={handleSubmit}>
                        <ValidatedInput 
                            className={styles.formInput} 
                            name={"email"} 
                            valid={emailValid} 
                            type={"email"} 
                            value={email} 
                            setValue={changeEmail} 
                            placeholder={"Correo electrónico"} 
                            autofocus={false}
                        />
                        { error && <span className="error-msg">{error}</span>}
                        <br/>
                        <br/>
                        <SubmitButton active={emailValid && email !== user?.email}>Guardar</SubmitButton>
                    </form>
                </div>
            </Modal>
        )
    } else if(step == 1) {
        return (
            <EmailVerification 
                closeModal={closeModal}
                notVerified={notVerified} 
                editEmail={() => setStep(0)}
            />
        )
    }
}