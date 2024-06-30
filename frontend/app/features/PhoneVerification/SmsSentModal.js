import Modal from "../../components/Modal/Modal";
import styles from "./PhoneVerification.module.scss";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function SmsSentModal({isRequesting, changeDisplayModal, isSuccess}) {
    if(isRequesting) {
        return (
            <Modal>
                <div className={styles['sms-sent-modal']}>
                    <div className={styles['loading-screen']}>
                        <LoadingSpinner width={"50px"}/> 
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <Modal>
            <div className={styles['sms-sent-modal']}>
                <div className={styles['sms-sent-modal-header']}>
                    <h3>
                        {isSuccess ? "Código de verificación enviado" : "Error al solicitar el código de verificación"}
                    </h3>
                </div>
                <div className={styles['sms-sent-modal-body']}>
                    <span>
                        {isSuccess ? "Ingresa el código de verificación que enviamos a tu número de teléfono."
                        : "Espera unos segundos antes de solicitar otro código de verificación."}
                    </span>
                </div>
                <div className={styles['sms-sent-modal-footer']}>
                    <button className={styles['sms-sent-modal-button']} onClick={() => changeDisplayModal(false)}>Aceptar</button>
                </div>
            </div>
        </Modal>
    )
}