import styles from './LabeledButton.module.scss';

export default function LabeledButton({label, text, clickedFn, verified}) {
    return (
        <button type='button' className={`${styles['labeled-btn']} ${verified ? styles['verified'] : styles['not-verified']}`} onClick={clickedFn}>
            <span className={styles['btn-label']}>{label}</span>
            <br/>
            <span>{text}</span>
        </button>
    )
}