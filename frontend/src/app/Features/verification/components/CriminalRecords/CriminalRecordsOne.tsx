import styles from "../VerificationSteps/Verification.module.scss";

export default function CriminalRecordsOne({ setStep }) {
    return (
        <section>
            <div className={styles.criminalRecordsTitle}>
                Carta de antecedentes no penales
            </div>
            <div className={styles.criminalRecordsDescription}>
                Deberas subir tu carta de antecedentes no penales.<br/>
                Ya puede ser tramitada desde internet en el siguiente link: <a href="https://constancias.oadprs.gob.mx/" target="_blank">https://constancias.oadprs.gob.mx/</a><br/>
                Asegurate que toda la información se vea clara y legible. Si no se puede leer, no podremos aceptarla.
            </div>
            <div style={{marginTop: "40px"}}>
                <button className={styles.startVerificationBtn} onClick={() => setStep(1)}>
                    Continuar
                </button>
            </div>
        </section>
    );
}