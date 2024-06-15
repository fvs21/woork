import Modal from "../../components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import { useState } from "react";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import EmailVerification from "../EmailVerification/EmailVerification";
import { useMutation } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useUser } from "../../hooks/useUser";

export default function EmailModal({changeDisplayModal}) {
    const user = useUser();
    const [email, setEmail] = useState(user.email);
    const [step, setStep] = useState(0);
    const axiosPrivate = useAxiosPrivate();

    const { mutateAsync: updateEmailFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.post(
                '/auth/email/update',
                email
            )
        }
    })

    function handleSubmit(event) {
        event.preventDefault();

        if(user.email !== email) {
            setStep(1);
        }
    }

    if(step == 0) {
        return (
            <Modal>
                <div className={styles['information-modal']}>
                    <div className={styles['email-modal-title']}>
                        <h2>Actualizar correo electrónico</h2>
                    </div>
                    <div className={styles['modal-desc']}>
                        <span>Al cambiar tu correo electrónico, deberás verificarlo con el código que te enviaremos.</span>
                    </div>
                    <br/>
                    <form onSubmit={handleSubmit}>
                        <ValidatedInput type={"email"} value={email} changeValue={setEmail} placeholder={"Correo electrónico"} autofocus={false}/>
                        <br/>
                        <br/>
                        <SubmitButton>Guardar</SubmitButton>
                    </form>
                    <button className={styles['cancel-btn']}
                            onClick={() => changeDisplayModal(false)}>Cancelar</button>
                </div>
            </Modal>
        )
    } else {
        return (
            <Modal>
                <div className={styles['information-modal']}>
                    <button className={styles['return-btn']} 
                        onClick={() => setStep(0)}>
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>
                    <EmailVerification />
                    <button className={styles['cancel-btn']}
                            onClick={() => changeDisplayModal(false)}>Cancelar</button>
                </div>
            </Modal>
        )
    }
}