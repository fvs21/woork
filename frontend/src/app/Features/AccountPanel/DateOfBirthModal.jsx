import { useState } from "react";
import Modal from "@/Components/Modal/Modal";
import CloseSVG from "@/Components/SVGs/Close";
import RegisterDateInput from "../Registration/RegisterDateInput";
import styles from "./InformationPanel.module.scss";
import SubmitButton from "@/Components/SubmitButton/SubmitButton";
import { validateAge } from "@/Services/validators";
import { stringifyDateOfBirth } from "@/Utils/authentication/RegisterUtils";
import axios from "@/api/axios";
import { useUser } from "@/jotai/user";
import { svgColor } from "@/Utils/extra/utils";

export default function DateOfBirthModal({closeModal}) {
    const [user, setUser] = useUser();

    const dob = new Date(user?.dateOfBirth.replace(/-/g, "/"));

    const [dateOfBirth, setDateOfBirth] = useState({
        "year": dob.getFullYear() || "",
        "month": dob.getMonth() || "",
        "day": dob.getDate() || ""
    });

    const body = {
        'dateOfBirth': stringifyDateOfBirth(dateOfBirth.year, dateOfBirth.month, dateOfBirth.day)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await axios.put("/dob/update", body);
            setUser({
                ...user,
                dateOfBirth: stringifyDateOfBirth(dateOfBirth.year, dateOfBirth.month, dateOfBirth.day)
            });
            closeModal();
        } catch(error) {
            console.log(error);
        }       
    }

    return (
        <Modal className={styles.dobModal} handleClose={closeModal}>
            <div className={styles.dobModalContainer} >
                <div className={styles['contact-modal-title']}>
                    <button className={styles['cancel-btn']}
                        onClick={closeModal}>
                            <CloseSVG width={"20px"} color={svgColor()}/>
                    </button>
                    <h2>Fecha de nacimiento</h2>
                </div>
                <div className={styles['modal-desc']}>
                    <span className={styles.disclaimer}>Esta información será verificada posteriormente con un documento de identificación oficial.</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <RegisterDateInput dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} />
                    <div className={styles['save-btn-container']}>
                        <SubmitButton active={validateAge(stringifyDateOfBirth(dateOfBirth.year, dateOfBirth.month-1, dateOfBirth.day))}>Guardar</SubmitButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}