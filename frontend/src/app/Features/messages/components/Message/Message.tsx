import styles from "./Message.module.scss";

export default function Message({content, ownMessage}) {
    return (
        <div className={`${styles.messageContainer} ${ownMessage ? styles.ownMessageContainer : styles.otherMessageContainer}`}>
            <div className={`${styles.message} ${ownMessage ? styles.ownMessage : styles.otherMessage}`}>
                {content}
            </div>
        </div>
    )
}