import Modal from "@/components/Modal/Modal";
import styles from "./Profile.module.scss";
import CloseSVG from "@/components/SVGs/Close";
import { svgColor } from "@/utils/extra/utils";
import TextArea from "@/components/TextArea/TextArea";
import { useState } from "react";

export default function AboutModal({about, setAbout, closeModal}) {
    function saveAbout() {
        setAbout(editedAbout.trim());
        closeModal();
    }

    const [editedAbout, setEditedAbout] = useState(about || "");
    const [characterCount, setCharacterCount] = useState(400 - (about?.length | 0));

    function onChangeAbout(text) {
        setEditedAbout(text);
        setCharacterCount(400 - text.length);
    }

    return (
        <Modal className={styles.aboutModalContainer} handleClose={closeModal}>
            <button className="closeModalBtn" onClick={closeModal}>
                <CloseSVG width={"20px"} color={svgColor()} />
            </button>
            <div className={styles.aboutModalHeader}>
                <div className={styles.aboutTitle}>
                    Acerca de ti
                </div>
                <div className={styles.instructions}>
                    Escribe algo sobre ti para que las demás personas puedan conocer más de ti.
                </div>
            </div>
            <div>
                <TextArea 
                    name={"about"}
                    value={editedAbout} 
                    setValue={onChangeAbout} 
                    className={styles.aboutInput} 
                    required={true} 
                    maxLength={400}
                />
                <span style={{color: "var(--text-secondary-color)", fontSize: "12px"}}>{characterCount} caracteres</span>
            </div>
            <div className={styles.saveBtnContainer}>
                <button 
                    className={styles.saveBtn}
                    onClick={saveAbout}>
                    Guardar
                </button>
            </div>
        </Modal>
    )
}