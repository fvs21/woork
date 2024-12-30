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
                style={{overflow: overflow || "hidden"}} 
                className={`${styles['form-container']} ${className}`}>
                {children}
            </div>
        </div>
    )
}