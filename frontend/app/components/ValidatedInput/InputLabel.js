import styles from './ValidatedInput.module.scss';
import '../../assets/globals.scss';
import { determineLabelColor } from '../../utils/authentication/DetermineStylesUtils';

export default function InputLabel({children, color}) {
    return (
        <label className={`${styles["input-label"]}`}>{children}</label>
    )
}