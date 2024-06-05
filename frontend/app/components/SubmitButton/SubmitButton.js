import styles from './SubmitButton.module.scss';

export default function SubmitButton({children}) {
    return (
        <div className={styles["btn-container"]}>
            <button type="sumbit" className={`${styles['btn-input']} ${styles['submit-btn']}`}>{children}</button>
        </div>
    )
}