import ReturnModalButton from "@/components/ReturnModalButton";
import styles from "./WorkerRegistration.module.scss";
import { WorkerRegistrationPropsTwo } from "./WorkerRegistrationOne";

export default function WorkerRegistrationTwo({setStep}: WorkerRegistrationPropsTwo) {
    return (
        <>
            <ReturnModalButton func={() => setStep(0)} />
            <header className={styles.modalHeader}>
                Siguientes pasos
            </header>
            <div className={styles.modalBody}>
                <p>Para continuar, como parte del proceso de seguridad que ofrecemos, debes subir tu <u>carta de antecedentes no penales.</u></p>
                <p>Deberas subir el documento escaneado, con la mejor calidad <u>posible</u>.</p>
            </div>
            <div className={styles.uploadDocumentInputContainer}>

            </div>
            <div className={styles.nextButtonContainer}>
                <button className={styles.nextButton} onClick={() => setStep(2)}>
                    Siguiente
                </button>
            </div>
        </>
    )
}