import React from "react";
import styles from "./SubmitButton.module.scss";

type SubmitButtonProps = {
    active: boolean;
    width?: string;
    children: React.ReactNode;
}

export default function SubmitButton({ children, width, active }: SubmitButtonProps) {
    return (
        <button
            type="submit"
            style={width ? { width: width, height: "auto" } : { width: "100%" }}
            className={` ${styles["submit-btn"]} ${active ? styles.active : styles.inactive}`}
            disabled={!active}
        >
            {children}
        </button>
    );
}
