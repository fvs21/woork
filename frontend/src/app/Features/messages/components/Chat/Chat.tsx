"use client"

import { useState } from "react";
import ChatContent from "../ChatContent/ChatContent";
import MessageInput from "../MessageInput/MessageInput";
import TopChatBar from "../TopChatBar/TopChatBar";
import styles from "./Chat.module.scss";
import { useSelectedChat, useStompClient } from "../../store";
import { MessagePayload } from "../../types";

export default function Chat() {
    const [selectedChat, setSelectedChat] = useSelectedChat();
    const [stompClient] = useStompClient();

    const [messages, setMessages] = useState([]);

    const addMessage = (message: string) => {
        setMessages([{
            content: message,
            ownMessage: true
        }, ...messages]);

        stompClient.send("/app/chat.sendMessage/2", {}, JSON.stringify({
            "receiver": 'mario-adame',
            "content": message,
            'type': 'TEXT'
        } as MessagePayload))
    }

    if(selectedChat == undefined) {
        return (
            <div className={`${styles.chatContainer} ${styles.chatNotSelected}`}>
                Selecciona un chat para empezar a hablar.
            </div>
        )
    }

    return (
        <div className={styles.chatContainer}>
            <TopChatBar name="Coxy" pfpUrl="http://localhost:8000/api/images/default-pfp"/>
            <ChatContent messages={messages}/>
            <MessageInput addMessage={addMessage}/>
        </div>
    )
}