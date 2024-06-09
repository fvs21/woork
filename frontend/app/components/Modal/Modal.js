import styles from './Modal.module.scss';

export default function Modal({children}) {
    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal-container']}>
                {children}
            </div>
        </div>
    )
}