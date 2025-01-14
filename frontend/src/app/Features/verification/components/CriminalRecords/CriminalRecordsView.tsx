"use client"

import { useEffect, useState } from "react";
import styles from "../MainView/MainView.module.scss";
import { determineWorkerVerificationStep } from "../../utils";
import { useWorkerRegistrationStatus } from "@/features/dashboard/components/workerRegistration/api";

export default function CriminalRecordsView() {
    const [step, setStep] = useState(0);

    const { data, isLoading } = useWorkerRegistrationStatus();

    useEffect(() => {
        if(data) {
            if(data.criminalRecordsVerificationStatus === "SUBMITTED")
                setStep(2);
        }
    }, [isLoading]);

    if(isLoading)
        return <></>
    
    return (
        <main className={styles.contentContainer}>
            {determineWorkerVerificationStep(step, setStep)}
        </main>
    );
}