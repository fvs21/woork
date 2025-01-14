import styles from "./Verification.module.scss";
import DocumentInput from "../DocumentInput";
import { useState } from "react";
import MutationButton from "@/components/MutationButton";
import { useUploadId } from "../../api";
import { flash } from "@/flash-message/flashMessageCreator";

export default function VerificationTwo({ setStep }) {
    const [idFront, setIdFront] = useState<File>();
    const [idBack, setIdBack] = useState<File>();

    const { upload, isLoading, uploadDisabled } = useUploadId();

    const inputDisabled = !idFront || !idBack;

    async function handleSubmit() {
        if(inputDisabled) {
            return;
        }

        const form = new FormData();
        form.append('id_front', idFront);
        form.append('id_back', idBack);

        try {
            await upload(form);
            setStep(2);
        } catch {
            flash("Sucedió un error al procesar tus documentos", 4000, "error");
        }
    }

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
                            <DocumentInput document={idFront} setDocument={setIdFront}/>
                        </div>
                        <div className={styles.idSubmitForm}>
                            <label className={styles.formLabel}>Parte trasera</label>
                            <DocumentInput document={idBack} setDocument={setIdBack}/>
                        </div>
                    </div>
                    <div className={styles.submitBtnContainer}>
                        <MutationButton classname={styles.submitBtn} click={handleSubmit} disable={uploadDisabled || inputDisabled}>
                            Enviar
                        </MutationButton>
                    </div>
                </div>
            </div>
        </section>
    )
}   