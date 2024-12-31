import Modal from "@/components/Modal/Modal";
import styles from "./Profile.module.scss";
import CloseSVG from "@/components/SVGs/Close";
import { svgColor } from "@/utils/extra/utils";

type UserPictureViewerProps = {
    name: string;
    url: string;
    closeModal: () => void;
}

export default function UserPictureViewer({name, url, closeModal}: UserPictureViewerProps) {
    return (
        <Modal className={styles.userPictureViewerModal} handleClose={closeModal}>
            <header className={styles.userPictureViewerHeader}>
                <button className="closeModalBtn" onClick={closeModal}>
                    <CloseSVG width={"20px"} color={svgColor()} />
                </button>
                <div className={styles.userPictureViewerTitle}>
                    {name}
                </div>
            </header>
            <div className={styles.userPictureContainer}>
                <div className={styles.imageWrapper}>
                    <img src={url} className={styles.image} /> 
                </div>
            </div>
        </Modal>
    )
}