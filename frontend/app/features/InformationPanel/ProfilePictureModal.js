import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import styles from './InformationPanel.module.scss';

export default function ProfilePictureModal({changeDisplayModal}) {
    const [step, setStep] = useState(0);

    if(step == 0) {
        return (
            <Modal>
                <div className={styles['pfp-modal']}>
                    <div className={styles['pfp-modal-header']}>
                        <h3>Foto de perfil</h3>
                    </div>
                    <hr className={styles['hr-style']}/>
                    <div className={styles['modal-desc']}>
                        <p>Cambia tu foto de perfil. Tu foto de perfil será visible para todos.</p>
                    </div>
                    <div>
                        <button className={styles['update-pfp-btn']}
                            onClick={() => setStep(1)}>Actualizar foto de perfil</button>
                    </div>
                    <div className={styles['cancel-pfp-container']}>
                        <button className={styles['cancel-btn']}
                            onClick={() => changeDisplayModal(false)}>Cancelar</button>
                    </div>
                </div>
            </Modal>
        )
    } else if(step == 1){
        return (
            <Modal>
                <div className={styles['pfp-modal']}>
                    <div>
                        <button className={styles['return-btn']} 
                            onClick={() => setStep(0)}>
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        </button>
                    </div>
                    <input type="file" />
                </div>
            </Modal>
        )
    }
    
}