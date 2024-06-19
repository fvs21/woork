import styles from './LabeledButton.module.scss';

export default function LabeledButton({label, text, clickedFn, error}) {
    //${error ? styles['error'] : ""}
    return (
        <button className={`${styles['labeled-btn']}`} onClick={clickedFn}>
            <span className={styles['btn-label']}>{label}</span>
            <br/>
            <span>{text}</span>
        </button>
    )
}