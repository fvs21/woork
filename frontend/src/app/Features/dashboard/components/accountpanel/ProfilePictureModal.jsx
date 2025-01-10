import { useRef, useState } from "react";
import Modal from "@/components/Modal/Modal";
import styles from './InformationPanel.module.scss';
import { checkIfValidImage } from "@/utils/account/AccountUtils";
import CloseSVG from "@/components/SVGs/Close";
import ArrowBackSVG from "@/components/SVGs/ArrowBack";
import ImageCropModal from "@/components/ImageCropModal/ImageCropModal";
import { useUpdatePfp, useUser } from "@/api/hooks/user";
import { svgColor } from "@/utils/extra/utils";
import { flash } from "@/flash-message/flashMessageCreator";

export default function ProfilePictureModal({closeModal}) {
    const [user] = useUser();

    const [image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState("");
    const [imageToCrop, setImageToCrop] = useState("");
    const [step, setStep] = useState(0);
    const pfpInput = useRef(null);
    const [displayCropModal, setDisplayCropModal] = useState(false);

    const { update } = useUpdatePfp();


    const pfpUrl = user?.pfp_url;


    function onImageChange(event) {
        if(event.target.files && event.target.files[0]) {
            if(checkIfValidImage(event.target.files[0])) {
                setImageToCrop(event.target.files[0]); 
                setDisplayCropModal(true);
            } else {
                flash("La extensión del archivo debe ser jpg o jpeg.", 4000, "error");
            }
        }
    }

    function changeImage(image) {
        setImageSrc(URL.createObjectURL(image));
        setImage(image);
        setStep(1);
    }


    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await update(image);
            flash("Foto de perfil actualizada.", 4000, "success");
            closeModal();
        } catch(error) {
            flash(error.response.data.message, 4000, "error");
        }
    }

    if(displayCropModal) {
        return (
            <ImageCropModal image={imageToCrop} setImage={changeImage} closeModal={() => setDisplayCropModal(false)}/>
        )
    }

    if(step == 0) {
        return (
            <Modal className={styles.pfpModal} handleClose={closeModal}>
                <div style={{transition: "height 0.25s linear"}} className={styles.pfpModalContainer}>
                    <div className={styles['contact-modal-title']}>
                        <button className={styles['cancel-btn']}
                            onClick={closeModal}>
                            <CloseSVG width={"20px"} color={svgColor()}/>
                        </button>
                        <h2>Foto de perfil</h2>
                    </div>
                    <span style={{whiteSpace: "nowrap"}} className={styles['disclaimer']}>Debes colocar una foto tuya. Asegurate que aparezca tu cara y hombros.</span>
                    <div className={styles['pfp-modal-pfp-container']}>
                        <img src={pfpUrl} className={styles['pfp-viewer']} />
                    </div>
                    <div className={styles['update-pfp-form-container']}>
                        <button className={styles['update-pfp-btn']} onClick={() => pfpInput.current.click()}>
                            Actualizar foto de perfil
                        </button>   
                        <input id="pfp-form" className={styles['update-pfp-input']} type="file" accept="image/jpeg, image/jpg" onChange={onImageChange} ref={pfpInput} hidden />
                    </div>
                </div>
            </Modal>
        )
    } else if(step == 1) {
        return (
            <Modal className={styles.pfpModal} handleClose={closeModal}>
                <div style={{transition: "height 0.25s linear"}} className={styles.pfpModalContainer}>
                    <div className={styles['contact-modal-title']}>
                        <button className={styles['return-btn']} 
                            onClick={() => {setImage(null); setImageSrc(null);setStep(0)}}>
                            <ArrowBackSVG width={"20px"} color={svgColor()}/>
                        </button>
                        <h2>Vista previa</h2>
                    </div>
                    <div className={styles['pfp-modal-pfp-container']}>
                        <img src={imageSrc} className={styles['pfp-viewer']} />
                    </div>
                    <div style={{paddingTop: "15px"}} className={styles['update-pfp-form-container']}>
                        <button className={styles['update-pfp-btn']} onClick={handleSubmit}>
                            Guardar
                        </button>   
                    </div>
                </div>
            </Modal> 
        )
    }
    
}