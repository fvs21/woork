import ReturnModalButton from "@/components/ReturnModalButton";
import styles from "./WorkerRegistration.module.scss";
import { WorkerRegistrationPropsTwo } from "./WorkerRegistrationOne";
import Link from "next/link";
import { useRegisterWorker } from "@/api/hooks/worker";
import MutationButton from "@/components/MutationButton";
import { flash } from "@/flash-message/flashMessageCreator";

export default function WorkerRegistrationThree({setStep}: WorkerRegistrationPropsTwo) {
    const { register, registerWorkerInvalid } = useRegisterWorker();

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {
            const request = await register();
            console.log(request);
            setStep(3);
        } catch(error) {
            flash(error.response.data.message, 4000, "error");
        }
    }

    return (
        <>
            <ReturnModalButton func={() => setStep(1)} />
            <header className={styles.modalHeader}>
                Muy bien!
            </header>
            <div className={styles.modalBody}>
                Ya casi estas listo para comenzar a trabajar en Woork!
            </div>
            <div className={styles.modalBody}>
                <div style={{fontSize: "20px", fontWeight: 500}}>
                    Por ultimo
                </div>
                <span style={{fontSize: "14px"}}>
                    Deberás completar tu perfil para que las demas personas te conozcan mejor, y sepan de tus habilidades.
                </span>
                <p style={{fontSize: "14px"}}>
                    Te recomendamos este recurso para que aprendas a utilizar la plataforma como trabajador: &nbsp;
                    <Link href={"#"} className={styles.resourceLink}>Haz click aqui.</Link>
                </p>
            </div>
            <div className={styles.nextButtonContainer}>
                <MutationButton classname={styles.nextButton} click={handleSubmit} disable={registerWorkerInvalid}>
                    Registrate!
                </MutationButton>
            </div>
        </>
    )
}