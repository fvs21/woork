import test from "node:test";
import { Message, MessagesListRecipient, Participant } from "../../types";
import Recipient from "../Recipient/Recipient";
import styles from "./MessagesList.module.scss";

export default function MessagesList() {
    const testParticipant: Participant = {
        name: "Mario",
        pfpUrl: "http://localhost:8000/api/images/default-pfp",
        id: 1
    };
    
    const testMessage: Message = {
        sender: testParticipant,
        content: "Okey",
        readAt: null,
        sentAt: new Date(),
        type: "text"
    };

    const messages: Array<MessagesListRecipient> = [
        {
            chatUser: testParticipant,
            lastMessage: testMessage,
            messagesUnread: 1
        }
    ];

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
                    <Recipient key={i} chatUser={msg.chatUser} lastMessage={msg.lastMessage} messagesUnread={msg.messagesUnread} />
                )
            })}
        </div>
    )
}