import styles from "./MessageInput.module.scss";

export default function MessageInput() {
    return (
        <footer className={styles.messageInputContainer}>
            <input className={styles.messageInput} placeholder="Mensaje..."/>
            <button className={styles.sendMessageButton}>
                Enviar
            </button>
        </footer>
    )
}