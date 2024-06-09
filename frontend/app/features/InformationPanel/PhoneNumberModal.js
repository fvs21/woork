import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import InputPhone from "../../components/InputPhone/InputPhone";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import PhoneVerification from "../PhoneVerification/PhoneVerification"

export default function PhoneNumberModal({changeDisplayModal}) {
    const [phoneNumber, setPhoneNumber] = useState("123456789");
    const [countryCode, setCountryCode] = useState("52");

    const [step, setStep] = useState(0);

    function handleSubmit(event) {
        event.preventDefault();
        //if phoneNumber is unchanged, close the modal

        //else
        setStep(1);
    }

    if(step == 0) {
        return (
            <Modal>
                <div className={styles['information-modal']}>
                    <div className={styles['phone-modal-title']}>
                        <h2>Actualizar número de teléfono</h2>
                    </div>
                    <div className={styles['phone-modal-desc']}>
                        <span>Al cambiar tu número de teléfono, deberas verificarlo con el código que te enviaremos.</span>
                    </div>
                    <br/>
                    <form onSubmit={handleSubmit}>
                        <InputPhone countryCode={countryCode} changeCountryCode={setCountryCode} number={phoneNumber} changeNumber={setPhoneNumber} autofocus={false} /> 
                        <br/>
                        <br/>
                        <SubmitButton>Guardar</SubmitButton>
                    </form>
                    <button className={styles['cancel-btn']}
                        onClick={() => changeDisplayModal(false)}>Cancelar</button>
                </div>
            </Modal>
        )
    } else if(step == 1) {
        return (
            <Modal>
                <div className={styles['information-modal']}>
                    <PhoneVerification />
                    <button className={styles['cancel-btn']}
                        onClick={() => changeDisplayModal(false)}>Cancelar</button>
                </div>
            </Modal>
        )
    }
}