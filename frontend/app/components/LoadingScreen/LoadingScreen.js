import styles from "./LoadingScreen.module.scss";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function LoadingScreen() {
    return (
        <div className={styles["loading-screen-overlay"]}>
           <div className={styles["loading-screen-content"]}>
                <LoadingSpinner width={"100px"} />
            </div> 
        </div>
    )
}