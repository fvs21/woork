import Modal from "@/Components/Modal/Modal";
import styles from "./Profile.module.scss";
import CloseSVG from "@/Components/SVGs/Close";
import { svgColor } from "@/Utils/extra/utils";

export default function UserPictureViewer({name, url, closeModal}) {
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