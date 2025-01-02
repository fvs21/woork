import React from "react";
import styles from "./Alert.module.scss";

type AlertProps = {
    children: React.ReactNode;
    width: string;
    height: string;
}

export default function Alert({children, width, height}: AlertProps) {
    return (
        <div className={styles['alert-overlay']}>
            <div className={styles['alert-container']} style={{width: width, height: height}}>
                {children}
            </div>
        </div>
    )
}   