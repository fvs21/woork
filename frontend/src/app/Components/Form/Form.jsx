import styles from './Form.module.scss'

export default function Form({overflow, children, className}) {
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