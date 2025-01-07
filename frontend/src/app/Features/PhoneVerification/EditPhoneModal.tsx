import Modal from "@/components/Modal/Modal";
import { validateCountryCode, validatePhoneNumber } from "@/services/validators";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import styles from "./PhoneVerification.module.scss";
import { useState } from "react";
import InputPhone from "@/components/InputPhone/InputPhone";
import { useUpdatePhone } from "@/api/hooks/authentication";

export default function EditPhoneModal({closeModal}) {
    const [phoneNumber, setPhoneNumber] = useState({
        countryCode: "",
        phone: "",
    });
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const { updatePhone, isLoading } = useUpdatePhone();

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
            await updatePhone({
                'phone': phoneNumber.phone,
                'countryCode': phoneNumber.countryCode
            });
            closeModal();
        } catch(error) {
            setErrorMsg(error.response.data.message);
        }
    }

    return (
        <Modal className={styles.editPhoneModalContainer} handleClose={closeModal}>
            <div className={styles['edit-phone-modal']}>
                <h2>Editar número de teléfono</h2>
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
                        <SubmitButton width={"50%"} active={validInput()}>
                            Editar
                        </SubmitButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}