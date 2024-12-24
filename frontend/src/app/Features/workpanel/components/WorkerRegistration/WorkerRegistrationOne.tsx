import CloseModalButton from "@/components/CloseModalButton";
import styles from "./WorkerRegistration.module.scss";
import Checkmark from "@/components/SVGs/Checkmark";

export interface WorkerRegistrationPropsTwo {
    setStep: Function
}

export default function WorkerRegistrationOne({setStep}: WorkerRegistrationPropsTwo) {
    return (
        <>
            <CloseModalButton close={() => setStep(-1)}/>
            <header className={`${styles.modalHeader} ${styles.modalTitle}`}>
                Empieza a trabajar en Woork
            </header>
            <div className={styles.modalBody}>
                <p>Para comenzar a trabajar, debes de haber verificado tu identidad en el apartado de "Verificate".</p>
                <div className={styles.checkmarkContainer}>
                    <Checkmark width={"120px"} color={"#5961f8"}/>
                </div>
            </div>
            <div className={styles.nextButtonContainer}>
                <button className={styles.nextButton} onClick={() => setStep(1)}>
                    Siguiente
                </button>
            </div>
        </>
    )
}