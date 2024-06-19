import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import InputPhone from "../../components/InputPhone/InputPhone";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useUser } from "../../hooks/useUser";
import { useUpdatePhone, useVerifyPhone } from "../../hooks/authentication";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import PhoneNotVerified from "./PhoneNotVerifiedModal";

export default function PhoneNumberModal({changeDisplayModal}) {
    const user = useUser();
    
    const defaultCountryCode = String(user.countryCode);
    const length = defaultCountryCode.length + String(user.phone).length;
    const defaultPhoneNumber = String(user.phone).slice(defaultCountryCode.length, length);

    const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber);
    const [countryCode, setCountryCode] = useState(defaultCountryCode);
    const [code, setCode] = useState("");

    const [step, setStep] = useState(0);

    const phoneBody = {
        "countryCode": countryCode,
        "phone": phoneNumber
    }

    const codeBody = {
        "otp": code
    }

    const { updatePhoneFn } = useUpdatePhone(phoneBody);
    const { verifyPhoneFn } = useVerifyPhone(codeBody);

    async function handleSubmitPhone(event) {
        event.preventDefault();
        if(countryCode+phoneNumber !== user.phone) {
            try {
                await updatePhoneFn();
                setStep(1);
            } catch (error) {
                console.log(error);
            }
        } else {
            changeDisplayModal(false);
        }
    }

    async function handleVerifyPhone(event) {
        event.preventDefault();

        try {
            await verifyPhoneFn();
            changeDisplayModal(false);
        } catch(error) {
            console.log(error);
        }
    }

    if(step == 0) {
        return (
            <Modal>
                <div className={styles['information-modal']}>
                    <div className={styles['phone-modal-title']}>
                        <h2>Actualizar número de teléfono</h2>
                    </div>
                    <div className={styles['modal-desc']}>
                        <span>Al cambiar tu número de teléfono, deberas verificarlo con el código que te enviaremos.</span>
                    </div>
                    <br/>
                    <form onSubmit={handleSubmitPhone}>
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
                    <button className={styles['return-btn']} 
                        onClick={() => setStep(0)}>
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>
                    <div className={styles['phone-modal-title']}>
                        <h2>Verifica tu número de teléfono</h2>
                    </div>
                    <form onSubmit={handleVerifyPhone}>
                        <ValidatedInput name={"verificationCode"} type={"text"} label={"Ingresa el código de verificación que enviamos a +" +countryCode+phoneNumber} 
                            placeholder={"Código de verificación"} changeValue={setCode} autofocus={false}/>
                        <br/>
                        <SubmitButton>Verificar</SubmitButton>
                    </form>
                </div>
            </Modal>
        )
    }
}