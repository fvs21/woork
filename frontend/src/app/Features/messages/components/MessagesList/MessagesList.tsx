import { useCurrentChats } from "../../api";
import { useSelectedChat } from "../../store";
import { SelectedChat } from "../../types";
import Recipient from "../Recipient/Recipient";
import styles from "./MessagesList.module.scss";

export default function MessagesList() {
    const [selectedChat, setSelectedChat] = useSelectedChat();

    const { data, isLoading } = useCurrentChats();

    const selectChat = (chat: SelectedChat) => {
        setSelectedChat(chat);
    }

    if(isLoading) {
        return (<></>)
    }

    if(data.length == 0) {
        return (
            <div className={`${styles.messagesList} ${styles.emptyMessages}`}>
                No tienes ningún mensaje
            </div>
        )
    }

    return (
        <div className={styles.messagesList}>
            {data.map(function(msg, i) {
                return (
                    <Recipient 
                        key={i} 
                        chatUser={msg.chatUser} 
                        lastMessage={msg.lastMessage} 
                        messagesUnread={msg.messagesUnread} 
                        chatId={msg.chatId}
                        selected={selectedChat ? selectedChat.chatId == msg.chatId : false}
                        selectChat={selectChat}
                    />
                )
            })}
        </div>
    )
}