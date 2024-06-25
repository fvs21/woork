import { useRef, useState } from "react";
import Modal from "../../components/Modal/Modal";
import styles from './InformationPanel.module.scss';
import { useUser } from "../../hooks/useUser";
import { useUpdatePfp } from "../../hooks/authentication";
import { checkIfValidImage } from "../../utils/account/AccountUtils";

export default function ProfilePictureModal({changeDisplayModal}) {
    const user = useUser();
    const [image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState("");
    const [step, setStep] = useState(0);
    const pfpInput = useRef(null);

    const pfpUrl = user?.profilePicture?.imageUrl || "http://localhost:8000/api/images/default-pfp";

    const { updatePfpFn } = useUpdatePfp(image);

    function onImageChange(event) {
        if(event.target.files && event.target.files[0]) {
            setImageSrc(URL.createObjectURL(event.target.files[0]));

            if(checkIfValidImage(event.target.files[0])) {
                setImage(event.target.files[0]);
                setStep(1);
            } else {
                //Handle error
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        try {
            const request = await updatePfpFn();
            changeDisplayModal(false);
        } catch(error) {
            console.log(error);
        }
    }

    if(step == 0) {
        return (
            <Modal>
                <div className={styles['pfp-modal']}>
                    <div className={styles['pfp-modal-header']}>
                        <h2>Foto de perfil</h2>
                    </div>
                    <br/>
                    <div className={styles['pfp-modal-pfp-container']}>
                        <img src={pfpUrl} className={styles['pfp-viewer']} />
                    </div>
                    <br/>
                    <br/>
                    <div className={styles['update-pfp-form-container']}>
                        <button className={styles['update-pfp-btn']} onClick={() => pfpInput.current.click()}>
                            Actualizar foto de perfil
                        </button>   
                        <input id="pfp-form" className={styles['update-pfp-input']} type="file" onChange={onImageChange} ref={pfpInput} hidden />
                    </div>
                    <div className={styles['cancel-pfp-container']}>
                        <button className={styles['cancel-btn']}
                            onClick={() => changeDisplayModal(false)}>Cancelar</button>
                    </div>
                </div>
            </Modal>
        )
    } else if(step == 1) {
        return (
            <Modal>
                <div className={styles['pfp-modal']}>
                    <button className={styles['return-btn']} 
                        onClick={() => setStep(0)}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>
                    <div>
                        <h2>Vista previa</h2>
                    </div>
                    <br/>
                    <div className={styles['pfp-modal-pfp-container']}>
                        <img src={imageSrc} className={styles['pfp-viewer']} />
                    </div>
                    <br/>
                    <div className={styles['update-pfp-form-container']}>
                        <button className={styles['update-pfp-btn']} onClick={handleSubmit}>
                            Guardar
                        </button>   
                    </div>
                    <div className={styles['cancel-pfp-container']}>
                        <button className={styles['cancel-btn']}
                            onClick={() => changeDisplayModal(false)}>Cancelar</button>
                    </div>
                </div>
            </Modal> 
        )
    }
    
}