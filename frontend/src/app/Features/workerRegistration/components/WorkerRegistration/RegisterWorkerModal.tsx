import Modal from "@/components/Modal/Modal";
import styles from "./WorkerRegistration.module.scss";
import { useState } from "react";
import { determineWorkerRegistrationModal } from "../../utils/WorkerRegistrationUtils";

interface RegisterWorkModalProps {
    close: Function
}

export default function RegisterWorkerModal({close}: RegisterWorkModalProps) {
    const [step, setStep] = useState<number>(0);

    function changeStep(newStep: number) {
        switch(newStep) {
            case -1:
                close();
                return;
            case 3: 
                close();
                return;
            default:
                setStep(newStep);
        }
    }
    
    return (
        <Modal className={styles.registerWorkerModal}>
            {determineWorkerRegistrationModal(step, changeStep)}
        </Modal>
    )
}