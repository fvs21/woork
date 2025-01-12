import styles from "./Verification.module.scss";

export default function VerificationTwo({setStep}) {
    return (
        <section className={styles.verificationContainer}>
            <div className={styles.verificationFormsContainer}>
                <div className={styles.idsForm}>
                    <div className={styles.idsFormTitle}>
                        Identificación oficial INE o IFE
                    </div>
                    <div className={styles.idsFormDescription}>
                        Deberás subir una foto de la parte delantera y trasera de tu identificación oficial con el CURP visible, teniendo en cuenta los siguientes aspectos:
                        <ul className={styles.requirementsList}>
                            <li>Debe ser <b>válida</b> y estar <b>vigente</b>.</li>
                            <li>El documento sea el original.</li>
                            <li>La foto sea lo más clara posible, asegurandose que muestre toda la información.</li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}