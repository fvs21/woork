import ChatContent from "../ChatContent/ChatContent";
import MessageInput from "../MessageInput/MessageInput";
import TopChatBar from "../TopChatBar/TopChatBar";
import styles from "./Chat.module.scss";

export default function Chat() {
    return (
        <div className={styles.chatContainer}>
            <TopChatBar name="Mario" pfpUrl="http://localhost:8000/api/images/default-pfp"/>
            <ChatContent />
            <MessageInput />
        </div>
    )
}