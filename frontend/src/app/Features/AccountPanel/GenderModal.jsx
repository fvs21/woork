import { useState } from "react";
import Modal from "@/Components/Modal/Modal";
import SubmitButton from "@/Components/SubmitButton/SubmitButton";
import CloseSVG from "@/Components/SVGs/Close";
import styles from "./InformationPanel.module.scss";
import axios from "@/api/axios";
import { useUser } from "@/jotai/user";
import { svgColor } from "@/Utils/extra/utils";

export default function GenderModal({closeModal}) {
    const [user, setUser] = useUser();

    const [gender, setGender] = useState(helper());
    const [otherGender, setOtherGender] = useState((user?.gender != 'Male' && user?.gender != 'Female') && user?.gender || "");

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
            await axios.put("/gender/update", {
                'gender': gender,
                'custom': gender == 'Other',
                'other': otherGender
            });
            setUser({
                ...user,
                gender: gender == 'Other' ? otherGender : gender
            });
            closeModal();
        } catch(error) {
            console.log(error);
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