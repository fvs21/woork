import { useState } from "react";
import styles from "./Verification.module.scss";
import FacePhotoModal from "../FacePhotoModal";
import { useUploadFacePhoto } from "../../api";
import { flash } from "@/flash-message/flashMessageCreator";
import MutationButton from "@/components/MutationButton";
//Face photo verification form

export default function VerificationThree({ setStep }) {
    const [facePhoto, setFacePhoto] = useState<File>();
    const [faceSnapshotModal, setFaceSnapshotModal] = useState<boolean>(false);

    const { upload, isLoading, uploadDisabled } = useUploadFacePhoto();

    const deletePhoto = () => {
        setFacePhoto(undefined);
    };

    const submitPhoto = async () => {
        const formData = new FormData();
        formData.append("face", facePhoto);

        console.log(facePhoto.name);
        

        try {
            await upload(formData);
            setStep(3);
        } catch {
            flash("Ocurrió un error al procesar tu foto.", 4000, "error");
        }
    };

    return (
        <section className={styles.verificationContainer}>
            <div className={styles.verificationFormsContainer}>
                <div className={styles.facePhotoForm}>
                    <div className={styles.idsFormTitle}>
                        Foto de tu cara
                    </div>
                    <div className={styles.facePhotoFormDescription}>
                        Debes tomarte una foto considerando los siguientes aspectos:
                        <ul className={styles.requirementsList}>
                            <li>Debes mirar a la camara directamente con tus ojos, la boca y los hombros claramente visibles.</li>
                            <li>Asegurate que la foto este bien iluminada y enfocada.</li>
                            <li>No deben ser fotos de otra foto, ni contener filtros o alguna alteración.</li>
                        </ul>
                    </div>
                    <div className={styles.faceExampleContainer}>
                        <img src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg" className={styles.facePhotoExample} alt="Foto de ejemplo" />
                    </div>
                    {
                        facePhoto ? (
                            <div className={styles.facePhotoOptionsContainer}>
                                <button className={styles.deletePhotoBtn} onClick={deletePhoto}>
                                    Eliminar foto
                                </button>
                                <MutationButton classname={styles.submitPhotoBtn} click={submitPhoto} disable={uploadDisabled}>
                                    Enviar foto
                                </MutationButton>
                            </div>
                        ) : (
                            <div className={styles.facePhotoOptionsContainer}>
                                <button className={styles.takePhotoBtn} onClick={() => setFaceSnapshotModal(true)}>
                                    Tomar foto
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
            {faceSnapshotModal && <FacePhotoModal setDisplayModal={setFaceSnapshotModal} facePhoto={facePhoto} setFacePhoto={setFacePhoto}/>}
        </section>
    )
}