import { useSelectedChat } from "../../store";
import { Message, MessagesListRecipient, Participant, SelectedChat } from "../../types";
import Recipient from "../Recipient/Recipient";
import styles from "./MessagesList.module.scss";

export default function MessagesList() {
    const [selectedChat, setSelectedChat] = useSelectedChat();

    const testParticipant: Participant = {
        name: "Coxy",
        pfpUrl: "http://localhost:8000/api/images/default-pfp",
        username: "cox"
    };
    
    const testMessage: Message = {
        sender: testParticipant,
        content: "Okey",
        readAt: null,
        sentAt: new Date(),
        type: "text",
        chatId: 1
    };

    const messages: Array<MessagesListRecipient> = [
        {
            chatUser: testParticipant,
            lastMessage: testMessage,
            messagesUnread: 0,
            chatId: 1
        }
    ];

    const selectChat = (chat: SelectedChat) => {
        setSelectedChat(chat);
    }

    if(messages.length == 0) {
        return (
            <div className={`${styles.messagesList} ${styles.emptyMessages}`}>
                No tienes ningún mensaje
            </div>
        )
    }

    return (
        <div className={styles.messagesList}>
            {messages.map(function(msg, i) {
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