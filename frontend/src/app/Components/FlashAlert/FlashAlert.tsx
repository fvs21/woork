import { svgColor } from "@/utils/extra/utils";
import CloseSVG from "../SVGs/Close";
import styles from "./FlashAlert.module.scss";
import React from "react";

type FlashAlertProps = {
    children: React.ReactNode;
    type: 'success' | 'error';
    deleteMsg: Function;
};

export default function FlashAlert({children, type = 'success', deleteMsg}: FlashAlertProps) {
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