import styles from './ValidatedInput.module.scss';
import '../../assets/globals.scss';

export default function InputLabel({children}) {
    return (
        <>
            <label className={`${styles["input-label"]}`}>{children}</label>
        </>
    )
}