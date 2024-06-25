import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import styles from "./PhoneVerification.module.scss";
import RegisterPhoneInput from "../Register/RegisterPhoneInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { validatePhoneNumber, validateCountryCode } from "../../services/Validators";
import { useUpdatePhone } from "../../hooks/authentication";
import { PHONE_NUMBER_TAKEN_ERROR } from "../../utils/authentication/RegistrationErrorResponses";

export default function EditPhoneModal({changeDisplayModal}) {
    const [phoneNumber, setPhoneNumber] = useState({
        countryCode: "",
        phone: "",
        errorMsg: "",
    });
    const body = {
        "countryCode": phoneNumber.countryCode,
        "phone": phoneNumber.phone
    }
    
    const { updatePhoneFn } = useUpdatePhone(body);

    function validInput() {
        return validatePhoneNumber(phoneNumber.phone) && validateCountryCode(phoneNumber.countryCode);
    }

    async function handleEditPhone(e) {
        e.preventDefault();

        try {
            await updatePhoneFn();
            changeDisplayModal(false);
        } catch(error) {
            switch(error.response.data) {
                case PHONE_NUMBER_TAKEN_ERROR:
                    setPhoneNumber({...phoneNumber, errorMsg: "Número de teléfono ya en uso."});
                    break;
            }
        }
    }

    return (
        <Modal>
            <div className={styles['edit-phone-modal']}>
                <h3>Editar número de teléfono</h3>
                <form onSubmit={handleEditPhone}>
                    <RegisterPhoneInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} errorMsg={phoneNumber.errorMsg}/>
                    <br/>
                    <br/>
                    <div className={styles['btn-container']}>
                        <button className={styles['cancel-btn']}
                            onClick={() => changeDisplayModal(false)}>Cancelar</button>
                        <SubmitButton width={"50%"} active={validInput()}>Editar</SubmitButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}