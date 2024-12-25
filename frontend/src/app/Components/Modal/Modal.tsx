import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import React, { MouseEventHandler, useEffect } from 'react';

interface ModalProps {
    children: React.ReactNode,
    className: string,
    handleClose?: MouseEventHandler<HTMLDivElement>
}

export default function Modal({children, className, handleClose}: ModalProps) {
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