import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import styles from "./InformationPanel.module.scss";
import InputPhone from "@/components/InputPhone/InputPhone";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { parsePhoneNumber } from "@/utils/authentication/RegisterUtils";
import { validatePhoneNumber } from "@/services/validators";
import CloseSVG from "@/components/SVGs/Close";
import { api } from "@/api/axios";
import { useUser } from "@/api/hooks/user";
import { svgColor } from "@/utils/extra/utils";

export default function PhoneNumberModal({closeModal}) {
    const [user] = useUser();
    
    const defaultCountryCode = String(user?.countryCode);
    const defaultPhoneNumber = parsePhoneNumber(defaultCountryCode, user?.phone);

    const [phoneNumber, setPhoneNumber] = useState({
        phone: defaultPhoneNumber,
        countryCode: defaultCountryCode
    });

    const [phoneValid, setPhoneValid] = useState(true);
    const [error, setError] = useState("");

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


    async function handleSubmitPhone(event) {
        event.preventDefault();
        return;
        if(phoneNumber.countryCode+phoneNumber.phone === user.phone) {
            return;
        }

        try {
            await axios.put('/phone/update', phoneNumber);
            window.location.replace("/verify-phone");
        } catch(error) {
            setError(error.response.data.message);
        }
        
    }

    return (
        <Modal className={styles.contactModal} handleClose={closeModal}>
            <div className={styles.contactModalContainer}>
                <div className={styles['contact-modal-title']}>
                    <button className="closeModalBtn"
                        onClick={closeModal}>
                        <CloseSVG width={"20px"} color={svgColor()}/>
                    </button>
                    <h2>Número de teléfono</h2>
                </div>
                <div className={styles['modal-desc']}>
                    <span>Al cambiar tu número de teléfono, deberás verificarlo con el código que te enviaremos.</span>
                </div>
                <form className={styles['form-container']} onSubmit={handleSubmitPhone}>
                    <InputPhone 
                        className={styles.formInput}
                        valid={phoneValid} 
                        countryCode={phoneNumber.countryCode} 
                        changeCountryCode={changeCountryCode} 
                        number={phoneNumber.phone} 
                        changeNumber={changeNumber} 
                        autofocus={false} 
                    /> 
                    {error && <span className="error-msg">{error}</span>}
                    <br/>
                    <br/>
                    <SubmitButton active={phoneValid && phoneNumber.countryCode + phoneNumber.phone !== user.phone}>Guardar</SubmitButton>
                </form>
            </div>
        </Modal>
    )
}