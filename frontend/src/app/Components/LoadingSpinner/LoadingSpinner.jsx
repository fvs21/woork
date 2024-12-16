import styles from "./LoadingSpinner.module.scss";

export default function LoadingSpinner({width}) {
    return <div style={{width: width, height: width}} className={styles['loader']}></div>
}