import React from 'react';
import styles from './Form.module.scss';

type FormProps = {
    overflow?: string;
    className: string;
    children: React.ReactNode;
}

export default function Form({overflow, children, className}: FormProps) {
    return (
        <div className={styles['form-overlay']}>
            <div 
                style={{overflowY: "auto"}} 
                className={`${styles['form-container']} ${className}`}
            >
                {children}
                <div className={styles.tosShrinked}>
                    <div className={styles.element}>
                        Términos y condiciones
                    </div>
                    <div className={styles.element}>
                        Privacidad
                    </div> 
                </div>
            </div>
            <div className={styles.tosAndPrivacy}>
                <div className={styles.element}>
                    Términos y condiciones
                </div>
                <div className={styles.element}>
                    Privacidad
                </div>
            </div>
        </div>
    )
}