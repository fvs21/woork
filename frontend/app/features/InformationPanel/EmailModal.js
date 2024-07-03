import Modal from "../../components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import { useState } from "react";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import EmailVerification from "./EmailVerification";
import { useUpdateEmail } from "../../hooks/authentication";
import { useUser } from "../../hooks/useUser";
import CloseSVG from "../../components/SVGs/Close";
import { validateEmail } from "../../services/Validators";

export default function EmailModal({changeDisplayModal}) {
    const user = useUser();
    const [email, setEmail] = useState(user?.email);
    const [emailValid, setEmailValid] = useState(true);
    const notVerified = user?.email && !user?.emailVerified;
    const [step, setStep] = useState(notVerified ? 1 : 0);

    const body = {
        "email": email
    }

    const { updateEmailFn } = useUpdateEmail(body);


    function changeEmail(email) {
        setEmail(email);
        setEmailValid(validateEmail(email));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if(user.email === email) {
            return;
        }

        try {
            await updateEmailFn();
            setStep(1);
        } catch(error) {
            console.log(error);
        }
    }


    if(step == 0) {
        return (
            <Modal>
                <div className={styles['contact-modal']}>
                    <div className={styles['contact-modal-title']}>
                        <button className={styles['cancel-btn']}
                            onClick={() => changeDisplayModal(false)}>
                            <CloseSVG width={"20px"} />
                        </button>
                        <h2>Actualizar correo electrónico</h2>
                    </div>
                    <div className={styles['modal-desc']}>
                        <span>Al cambiar tu correo electrónico, deberás verificarlo con el código que te enviaremos.</span>
                    </div>
                    <br/>
                    <form onSubmit={handleSubmit}>
                        <ValidatedInput valid={emailValid} type={"email"} value={email} setValue={changeEmail} placeholder={"Correo electrónico"} autofocus={false}/>
                        <br/>
                        <br/>
                        <SubmitButton active={emailValid && email !== user.email}>Guardar</SubmitButton>
                    </form>
                </div>
            </Modal>
        )
    } else if(step == 1) {
        return (
            <EmailVerification changeDisplayModal={changeDisplayModal} notVerified={notVerified} editEmail={() => setStep(0)}/>
        )
    }
}