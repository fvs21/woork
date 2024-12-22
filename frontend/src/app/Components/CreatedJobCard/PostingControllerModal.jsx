import { svgColor } from "@/utils/extra/utils";
import Modal from "../Modal/Modal";
import CloseSVG from "../SVGs/Close";
import TrashcanSVG from "../SVGs/Trashcan";
import styles from "./CreatedPostingCard.module.scss";
import Link from "next/link";
import { useState } from "react";

export default function PostingControllerModal({ title, id, closeModal, deleteFn }) {
    const svgClr = svgColor();

    const [ensureDelete, setEnsureDelete] = useState(false);

    if(ensureDelete) {
        return (
            <Modal className={styles.onClickModalContainer} handleClose={closeModal}>
                <button
                    className="closeModalBtn2"
                    onClick={closeModal}
                >
                    <CloseSVG width={"20px"} color={svgClr} />
                </button>
                <div className={styles.modalBody}>
                    <header className={styles.modalPostingTitle}>Estás seguro que quieres eliminar esta publicación?</header>
                    <div className={styles.desc}>Esta acción no se puede deshacer.</div>
                    <div className={styles.deletePostingBtns}>
                        <button className={styles.cancelDeleteBtn} onClick={() => setEnsureDelete(false)}>Cancelar</button>
                        <button className={styles.confirmDeleteBtn} onClick={deleteFn}>Eliminar</button>
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <Modal className={styles.onClickModalContainer} handleClose={closeModal}>
            <button
                className="closeModalBtn2"
                onClick={closeModal}
            >
                <CloseSVG width={"20px"} color={svgClr} />
            </button>
            <div className={styles.modalBody}>
                <header className={styles.modalPostingTitle}>{title}</header>
                <div className={styles.postingControllerBtnsContainer}>
                    <Link
                        href={`/posting/${id}`}
                        className={styles.visitPostingBtn}
                    >
                        Ir a anuncio
                    </Link>
                    <button className={styles.deletePostingBtn} onClick={() => setEnsureDelete(true)}>
                        <TrashcanSVG width={"18px"} color={svgClr} />
                        Eliminar anuncio
                    </button>
                </div>
            </div>
        </Modal>
    );
}
