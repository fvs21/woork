import { useState } from "react";
import Modal from "@/Components/Modal";
import ValidatedInput from "@/Components/ValidatedInput/ValidatedInput";
import styles from "../InformationPanel/InformationPanel.module.scss";
import SubmitButton from "@/Components/SubmitButton/SubmitButton";


export default function PhoneNotVerifiedModal({setDisplayPhoneNotVerifiedModal, setDisplayPhoneModal, user}) {
    function editPhoneNumber() {
        setDisplayPhoneModal(true);
        setDisplayPhoneNotVerifiedModal(false);
    }

    return (
        <Modal>
            <div className={styles['information-modal']}>
                <div className={styles['phone-modal-title']}>
                    <h2>Debes verificarte para continuar</h2>
                </div>
                <form>
                    <ValidatedInput name={"verificationCode"} type={"text"} label={"Ingresa el código de verificación que enviamos a +" + user.phone} 
                        placeholder={"Código de verificación"} autofocus={false}/>
                    <br/>
                    <SubmitButton>Verificar</SubmitButton>
                </form>
                <br/>
                <div className={styles['edit-phone-container']}>
                    <button className={styles['edit-phone-btn']} onClick={editPhoneNumber}>Cambiar número de teléfono</button>
                </div>
            </div>
        </Modal>
    )
}