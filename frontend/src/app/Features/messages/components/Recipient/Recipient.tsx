import dayjs from "dayjs";
import { MessagesListRecipient, SelectedChat } from "../../types";
import styles from "./Recipient.module.scss";

type RecipientProps = MessagesListRecipient & {
    selected: boolean;
    selectChat: (chat: SelectedChat) => void;
}

export default function Recipient(
    {chatUser, lastMessage, messagesUnread, chatId, selected, selectChat}: RecipientProps
) {
    const setSelectedChat = () => {
        selectChat({
            chatId,
            recipient: chatUser,
            create: false
        });
    }

    return (
        <button className={`${styles.recipient} ${selected && styles.selected}`} onClick={setSelectedChat}>
            <div className={styles.pfpContainer}>
                <img src={chatUser.pfpUrl} className={styles.recipientPfp}/>
            </div>
            <div className={styles.chatInformation}>
                <div className={styles.nameAndTime}>
                    <div className={styles.recipientName}>
                        {chatUser.name}
                    </div>
                    <span className={styles.lastMessageTime}>
                        {dayjs(lastMessage.sentAt).format("HH:mm")}
                    </span>
                </div>
                <div className={styles.lastMessageAndMessageCount}>
                    <div className={`${styles.lastMessage} ${messagesUnread > 0 && styles.lastMessageUnread}`}>   
                        {lastMessage.sender.username != chatUser.username && <b>Enviado: </b>} {lastMessage.content}
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