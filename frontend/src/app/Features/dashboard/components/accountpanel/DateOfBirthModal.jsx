import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import CloseSVG from "@/components/SVGs/Close";
import RegisterDateInput from "@/features/registration/components/RegisterDateInput";
import styles from "./InformationPanel.module.scss";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { validateAge } from "@/services/validators";
import { stringifyDateOfBirth } from "@/utils/authentication/RegisterUtils";
import { useUpdateDob, useUser } from "@/api/hooks/user";
import { svgColor } from "@/utils/extra/utils";
import { flash } from "@/flash-message/flashMessageCreator";

export default function DateOfBirthModal({closeModal}) {
    const [user] = useUser();

    const dob = new Date(user?.dateOfBirth.replace(/-/g, "/"));

    const [dateOfBirth, setDateOfBirth] = useState({
        "year": dob.getFullYear() || "",
        "month": dob.getMonth() || "",
        "day": dob.getDate() || ""
    });

    const { update } = useUpdateDob();

    const body = {
        'dateOfBirth': stringifyDateOfBirth(dateOfBirth.year, dateOfBirth.month, dateOfBirth.day)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await update(body);
            flash("Fecha de nacimiento actualizada.", 4000, "success");
            closeModal();
        } catch(error) {
            flash(error.response.data.message, 4000, "error");
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