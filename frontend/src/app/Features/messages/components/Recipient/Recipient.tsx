import { MessagesListRecipient } from "../../types";
import styles from "./Recipient.module.scss";

export default function Recipient({chatUser, lastMessage, messagesUnread}: MessagesListRecipient) {
    return (
        <button className={styles.recipient}>
            <div className={styles.pfpContainer}>
                <img src={chatUser.pfpUrl} className={styles.recipientPfp}/>
            </div>
            <div className={styles.chatInformation}>
                <div className={styles.nameAndTime}>
                    <div className={styles.recipientName}>
                        {chatUser.name}
                    </div>
                    <span className={styles.lastMessageTime}>
                        10:47
                    </span>
                </div>
                <div className={styles.lastMessageAndMessageCount}>
                    <div className={`${styles.lastMessage} ${styles.lastMessageUnread}`}>   
                        {lastMessage.content}
                    </div>
                    {messagesUnread > 0 &&
                        <span className={styles.unreadCount}>
                            {messagesUnread}
                        </span>
                    }
                </div>
            </div>
        </button>
    )
}