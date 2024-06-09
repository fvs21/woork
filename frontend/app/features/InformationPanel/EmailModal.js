import Modal from "../../components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import { useState } from "react";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

export default function EmailModal({changeDisplayModal}) {
    const [email, setEmail] = useState("company@mail.com");

    return (
        <Modal>
            <div className={styles['information-modal']}>
                <div className={styles['email-modal-title']}>
                    <h2>Actualizar correo electrónico</h2>
                </div>
                <div className={styles['email-modal-desc']}>
                    <span>Al cambiar tu correo electrónico, deberás verificarlo con el código que te enviaremos.</span>
                </div>
                <button onClick={() => changeDisplayModal(false)}>X</button>
            </div>
        </Modal>
    )
}