import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import InputPhone from "../../components/InputPhone/InputPhone";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useUser } from "../../hooks/useUser";
import { useUpdatePhone } from "../../hooks/authentication";
import { parsePhoneNumber } from "../../utils/authentication/RegisterUtils";
import { validatePhoneNumber } from "../../services/Validators";
import CloseSVG from "../../components/SVGs/Close";

export default function PhoneNumberModal({changeDisplayModal}) {
    const user = useUser();
    
    const defaultCountryCode = String(user?.countryCode);
    const defaultPhoneNumber = parsePhoneNumber(defaultCountryCode, user?.phone);

    const [phoneNumber, setPhoneNumber] = useState({
        phone: defaultPhoneNumber,
        countryCode: defaultCountryCode
    });

    const [phoneValid, setPhoneValid] = useState(true);

    const changeNumber = (value) => {
        setPhoneNumber({
            ...phoneNumber,
            phone: value
        });

        setPhoneValid(validatePhoneNumber(value));
    }

    const changeCountryCode = (value) => {
        setPhoneNumber({
            ...phoneNumber,
            countryCode: value
        });
    }

    const phoneBody = {
        "countryCode": phoneNumber.countryCode,
        "phone": phoneNumber.phone
    }


    const { updatePhoneFn } = useUpdatePhone(phoneBody);

    async function handleSubmitPhone(event) {
        event.preventDefault();
        if(phoneNumber.countryCode+phoneNumber.phone === user.phone) {
            return;
        }

        try {
            await updatePhoneFn();
            window.location.replace("/register/verify");
        } catch (error) {
            console.log(error);
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
                    <h2>Actualizar número de teléfono</h2>
                </div>
                <div className={styles['modal-desc']}>
                    <span>Al cambiar tu número de teléfono, deberás verificarlo con el código que te enviaremos.</span>
                </div>
                <br/>
                <form onSubmit={handleSubmitPhone}>
                    <InputPhone valid={phoneValid} countryCode={phoneNumber.countryCode} changeCountryCode={changeCountryCode} number={phoneNumber.phone} 
                        changeNumber={changeNumber} autofocus={false} /> 
                    <br/>
                    <br/>
                    <SubmitButton active={phoneValid && phoneNumber.countryCode + phoneNumber.phone !== user.phone}>Guardar</SubmitButton>
                </form>
            </div>
        </Modal>
    )
}