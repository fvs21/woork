import styles from "./Alert.module.scss";

export default function Alert({children, width, height}) {
    return (
        <div className={styles['alert-overlay']}>
            <div className={styles['alert-container']} style={{width: width, height: height}}>
                {children}
            </div>
        </div>
    )
}   