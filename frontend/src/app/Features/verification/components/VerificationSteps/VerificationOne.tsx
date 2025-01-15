import Logotype from "@/components/Logotype/Logotype";
import styles from "./Verification.module.scss";
import Link from "next/link";

export default function VerificationOne({setStep}) {
    return (
        <section className={styles.contentContainer}>
            <div style={{marginBottom: "20px"}}>
                <Logotype width={"250px"} />
                <div className={styles.title}>Verifíca tu identidad en Woork</div>
            </div>
            <div className={styles.requirements}>
                <h3>Necesitaras:</h3>
                <ol className={styles.steps}>
                    <li>Una foto de una identificación oficial, ya sea licencia de conducir o credencial para votar</li>
                    <li>Una foto de tu cara.</li>
                </ol>
                <Link href={"#"} className={styles.informationDisclaimer}>¿Cómo utilizamos esta información?</Link>
            </div>
            <div>
                <button className={styles.startVerificationBtn} onClick={() => setStep(1)}>
                    Comenzar
                </button>
            </div>
        </section>
    )
}