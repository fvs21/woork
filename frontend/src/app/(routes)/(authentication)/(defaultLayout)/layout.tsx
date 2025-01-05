import Logotype from "@/components/Logotype/Logotype";
import styles from "../Auth.module.scss";

export default function Layout({children}) {
    return (
        <div className={`${styles.authContainer}`}>
            <div className={styles['logotype-container']}>
                <Logotype width={"200px"} />
            </div>
            {children}
        </div>
    )
}