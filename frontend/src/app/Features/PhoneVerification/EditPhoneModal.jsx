import Modal from "@/Components/Modal/Modal";
import { validateCountryCode, validatePhoneNumber } from "@/Services/validators";
import SubmitButton from "@/Components/SubmitButton/SubmitButton";
import styles from "./PhoneVerification.module.scss";
import { useState } from "react";
import axios from "@/api/axios";
import InputPhone from "@/Components/InputPhone/InputPhone";

export default function EditPhoneModal({setUser, closeModal}) {
    const [phoneNumber, setPhoneNumber] = useState({
        countryCode: "",
        phone: "",
    });
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    function validInput() {
        return validatePhoneNumber(phoneNumber.phone) && validateCountryCode(phoneNumber.countryCode);
    }

    const changeNumber = (value) => {
        setPhoneNumber({
            ...phoneNumber,
            phone: value
        });

        setPhoneNumberValid(validatePhoneNumber(value));
    }
    const changeCountryCode = (value) => {
        setPhoneNumber({
            ...phoneNumber,
            countryCode: value
        });
    }

    async function handleEditPhone(e) {
        e.preventDefault();

        try {
            await axios.put("/phone/update", {
                'phone': phoneNumber.phone,
                'countryCode': phoneNumber.countryCode
            });
            setUser((prev) => ({
                ...prev,
                phone: phoneNumber.countryCode + phoneNumber.phone,
            }));
            closeModal();
        } catch(error) {
            setErrorMsg(error.response.data.message);
        }
    }

    return (
        <Modal className={styles.editPhoneModalContainer} handleClose={closeModal}>
            <div className={styles['edit-phone-modal']}>
                <h3>Editar número de teléfono</h3>
                <form onSubmit={handleEditPhone}>
                    <div className={styles['input-field']} >
                        <InputPhone 
                            className={styles.formInput}
                            valid={phoneNumberValid} 
                            countryCode={phoneNumber.countryCode} 
                            number={phoneNumber.phone} 
                            changeNumber={changeNumber} 
                            changeCountryCode={changeCountryCode}
                            label={"Número de teléfono"} 
                            autofocus={false}/>
                        {errorMsg && <span className="error-msg">{errorMsg}</span>}
                    </div>
                    <div className={styles['btn-container']}>
                        <button className={styles['cancel-btn']}
                            onClick={closeModal}>Cancelar</button>
                        <SubmitButton width={"50%"} active={validInput()}>Editar</SubmitButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}