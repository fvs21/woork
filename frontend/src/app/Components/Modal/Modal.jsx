import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import { useEffect } from 'react';

export default function Modal({children, className, handleClose}) {
    useEffect(() => {
        const body = document.body;
        body.classList.toggle('modal-background');

        return () => body.classList.remove('modal-background');
    }, []);

    return (
        createPortal(
            <div className={styles.modalOverlay} onClick={handleClose}>
                <div className={`${styles.modalContainer} ${className}`} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>,
            document.body
        )
    );
}