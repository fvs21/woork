import UploadSVG from "@/components/SVGs/Upload";
import styles from "./Verification.module.scss";
import DocumentInput from "../DocumentInput";

export default function VerificationTwo({ setStep }) {
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
                            <li className={styles.requirement}>Debe ser <b>válida</b> y estar <b>vigente</b>.</li>
                            <li className={styles.requirement}>El documento sea el original.</li>
                            <li className={styles.requirement}>La foto sea lo más clara posible, asegurandose que muestre toda la información.</li>
                            <li className={styles.requirement}>Formato de archivos aceptado: jpg, jpeg, png.</li>
                        </ul>
                    </div>
                    <div className={styles.idsSubmitFormsContainer}>
                        <div className={styles.idSubmitForm}>
                            <label className={styles.formLabel}>Parte delantera</label>
                            <DocumentInput />
                        </div>
                        <div className={styles.idSubmitForm}>
                            <label className={styles.formLabel}>Parte trasera</label>
                            <DocumentInput />
                        </div>
                    </div>
                    <div className={styles.submitBtnContainer}>
                        <button className={styles.submitBtn}>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}