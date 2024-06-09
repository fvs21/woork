import Modal from "../../components/Modal/Modal";
import styles from './InformationPanel.module.scss';

export default function ProfilePictureModal({changeDisplayModal}) {
    return (
        <Modal>
            <div className={styles['pfp-modal']}>
                <div className={styles['pfp-modal-header']}>
                    <h3>Foto de perfil</h3>
                </div>
                <hr className={styles['hr-style']}/>
                <div className={styles['pfp-description']}>
                    <p>Cambia tu foto de perfil. Tu foto de perfil será visible para todos.</p>
                </div>
                <div>
                    <button className={styles['update-pfp-btn']}>Actualizar foto de perfil</button>
                </div>
                <div className={styles['cancel-pfp-container']}>
                    <button className={styles['cancel-btn']}
                        onClick={() => changeDisplayModal(false)}>Cancelar</button>
                </div>
            </div>
        </Modal>
    )
}