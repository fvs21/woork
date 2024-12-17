import styles from './ValidatedInput.module.scss';

export default function InputLabel({children}) {
    return (
        <>
            <label className={`${styles["input-label"]}`}>{children}</label>
        </>
    )
}