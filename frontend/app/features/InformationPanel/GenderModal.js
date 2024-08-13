import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import CloseSVG from "../../components/SVGs/Close";
import styles from "./InformationPanel.module.scss";
import { useUpdateGender } from "../../hooks/authentication";
import { useUser } from "../../hooks/useUser";

export default function GenderModal({changeDisplayModal}) {
    const user = useUser();
    const [gender, setGender] = useState(user?.gender || "");

    const { updateGenderFn } = useUpdateGender({
        "gender": gender
    })

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await updateGenderFn();
            changeDisplayModal(false);
        } catch(error) {
            console.log(error);
        }

    }

    return (
        <Modal>
            <div className={styles['gender-modal']}>
                <div className={styles['contact-modal-title']}>
                    <button className={styles['cancel-btn']}
                        onClick={() => changeDisplayModal(false)}>
                            <CloseSVG width={"20px"} />
                    </button>
                    <h2>Género</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <select className={styles['gender-select']} defaultValue={gender} 
                        onChange={(e) => setGender(e.target.value)}>
                        <option value={""} disabled>Género</option>
                        <option value={"MALE"}>Hombre</option>
                        <option value={"FEMALE"}>Mujer</option>
                        <option value={"OTHER"}>Otro</option>
                    </select>
                    <br/><br/><br/>
                    <SubmitButton active={gender !== ""}>Guardar</SubmitButton>
                </form>
            </div>
        </Modal>
    )
}