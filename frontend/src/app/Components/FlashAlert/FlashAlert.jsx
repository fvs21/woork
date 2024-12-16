import { svgColor } from "@/Utils/extra/utils";
import CloseSVG from "../SVGs/Close";
import styles from "./FlashAlert.module.scss";

export default function FlashAlert({children, type = 'success', deleteMsg}) {
    return (
        <div className={`${styles.bottomAlertContainer} ${type === 'error' ? styles.errorMsg : styles.successMsg}`}>
            <div className={styles.alertMessage}>
                {children}
            </div>
            <button className={styles.closeAlert} onClick={() => deleteMsg()}>
                <CloseSVG width={"25px"} color={svgColor()} />
            </button>
        </div>
    )
}