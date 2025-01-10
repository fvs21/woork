import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import CloseSVG from "@/components/SVGs/Close";
import styles from "./InformationPanel.module.scss";
import { api } from "@/api/axios";
import { useUpdateGender, useUser } from "@/api/hooks/user";
import { svgColor } from "@/utils/extra/utils";
import { flash } from "@/flash-message/flashMessageCreator";

export default function GenderModal({closeModal}) {
    const [user] = useUser();

    const [gender, setGender] = useState(helper());
    const [otherGender, setOtherGender] = useState((user?.gender != 'Male' && user?.gender != 'Female') && user?.gender || "");

    const { update } = useUpdateGender();

    function helper() {
        if(user?.gender) {
            if(user.gender == 'Male' || user.gender == 'Female')
                return user.gender;
            else    
                return 'Other';
        } else 
            return "";
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await update({
                'gender': gender,
                'custom': gender == 'Other',
                'other': otherGender
            });
            
            closeModal();
        } catch(error) {
            flash(error.response.data.message, 4000, "error");
        }
    }

    return (
        <Modal className={styles.genderModal} handleClose={closeModal}>
            <div className={styles.genderModalContainer}>
                <div className={styles['contact-modal-title']}>
                    <button className={styles['cancel-btn']}
                        onClick={closeModal}>
                            <CloseSVG width={"20px"} color={svgColor()}/>
                    </button>
                    <h2>Género</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: gender == "Other" ? "50px" : "30px"}} className={styles['gender-select-container']}>
                        <select 
                            style={{borderBottomLeftRadius: gender == "Other" ? 0 : "6px", borderBottomRightRadius: gender == "Other" ? 0 : "6px"}}
                            className={styles['gender-select']} 
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value={""} disabled>Género</option>
                            <option value={"Male"}>Hombre</option>
                            <option value={"Female"}>Mujer</option>
                            <option value={"Other"}>Otro</option>
                        </select>
                        <br/>
                        {gender == "Other" && 
                            <input 
                                spellCheck={false}
                                className={styles['gender-other-input']} 
                                type="text" 
                                autoFocus={true} 
                                placeholder="Otro"
                                value={otherGender}
                                onChange={(e) => setOtherGender(e.target.value)}/>
                        }
                        </div>
                    <div style={{marginBottom: "12px"}} className={styles['save-btn-container']}>
                        <SubmitButton active={gender !== ""}>Guardar</SubmitButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}