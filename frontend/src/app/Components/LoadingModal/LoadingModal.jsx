import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Modal from "../Modal/Modal";
import styles from "./LoadingModal.module.scss";

export default function LoadingModal() {
    return (
        <Modal className={styles.loadingModal}>
            <LoadingSpinner width={"60px"} />
        </Modal>
    )
}