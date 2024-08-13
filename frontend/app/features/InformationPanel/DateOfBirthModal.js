import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import CloseSVG from "../../components/SVGs/Close";
import RegisterDateInput from "../Register/RegisterDateInput";
import styles from "./InformationPanel.module.scss";
import { useUser } from "../../hooks/useUser";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { validateAge } from "../../services/Validators";
import { stringifyDateOfBirth } from "../../utils/authentication/RegisterUtils";

export default function DateOfBirthModal({changeDisplayModal}) {
    const user = useUser();
    const dob = new Date(user?.dateOfBirth + " ");

    const [dateOfBirth, setDateOfBirth] = useState({
        "year": dob.getFullYear() || "",
        "month": dob.getMonth() || "",
        "day": dob.getDate() || ""
    });

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <Modal>
            <div className={styles['dob-modal']} >
                <div className={styles['contact-modal-title']}>
                    <button className={styles['cancel-btn']}
                        onClick={() => changeDisplayModal(false)}>
                            <CloseSVG width={"20px"} />
                    </button>
                    <h2>Fecha de nacimiento</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <RegisterDateInput dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} />
                    <br/><br/>
                    <SubmitButton active={validateAge(stringifyDateOfBirth(dateOfBirth.year, dateOfBirth.month, dateOfBirth.day))}>Guardar</SubmitButton>
                </form>
            </div>
        </Modal>
    )
}