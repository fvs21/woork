import styles from './LabeledButton.module.scss';

type LabeledButtonProps = {
    label: string;
    text: string;
    clickedFn: () => void;
    verified?: boolean;
}

export default function LabeledButton({label, text, clickedFn, verified}: LabeledButtonProps) {
    return (
        <button type='button' className={`${styles['labeled-btn']} ${verified ? styles['verified'] : styles['not-verified']}`} onClick={clickedFn}>
            <span className={styles['btn-label']}>{label}</span>
            <br/>
            <span>{text}</span>
        </button>
    )
}