import { useState } from "react";
import DocumentInput from "../DocumentInput";
import styles from "../VerificationSteps/Verification.module.scss";
import MutationButton from "@/components/MutationButton";
import { useUploadCriminalRecords } from "../../api";
import { flash } from "@/flash-message/flashMessageCreator";

export default function CriminalRecordsTwo({ setStep }) {
    const [criminalRecords, setCriminalRecords] = useState<File | null>(null);

    const { upload, uploadDisabled } = useUploadCriminalRecords();
    
    const handleSubmit = async () => {
        if (!criminalRecords) {
            return;
        }

        const formData = new FormData();
        formData.append("criminalRecords", criminalRecords);

        try {
            await upload(formData);
            setStep(2);
        } catch {
            flash("Error al procesar tus documentos", 4000, "error");
        }
    };

    return (
        <section className={styles.verificationContainer}>
            <div className={styles.verificationFormsContainer}>
                <div className={styles.criminalRecordsForm}>
                    <div className={styles.criminalRecordsFormTitle}>
                        Sube tu carta de antecedentes penales
                    </div>
                    <div className={styles.criminalRecordsFormDescription}>
                        <div className={styles.criminalRecordsInput}>
                            <DocumentInput
                                document={criminalRecords}
                                setDocument={setCriminalRecords}
                            />
                        </div>
                    </div>
                    <div className={styles.submitBtnContainer}>
                        <MutationButton classname={styles.submitBtn} click={handleSubmit} disable={uploadDisabled}>
                            Subir
                        </MutationButton>
                    </div>
                </div>
            </div>
        </section>
    );
}