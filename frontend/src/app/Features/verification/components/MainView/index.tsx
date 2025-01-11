"use client"

import { determineVerificationStep } from "../../utils";
import styles from "./MainView.module.scss";
import { useState } from "react";

export default function MainView() {
    const [step, setStep] = useState(0);

    return (
        <main className={styles.contentContainer}>
            {determineVerificationStep(step, setStep)}
        </main>
    )
}