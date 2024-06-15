import styles from "./LoadingScreen.module.scss"

export default function LoadingScreen() {
    return (
        <div className={styles["loading-screen-overlay"]}>
           <div className={styles["loading-screen-content"]}>
                <h1>Cargando...</h1>
            </div> 
        </div>
    )
}