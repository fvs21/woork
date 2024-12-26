"use client"

import { useState } from "react";
import ChatContent from "../ChatContent/ChatContent";
import MessageInput from "../MessageInput/MessageInput";
import TopChatBar from "../TopChatBar/TopChatBar";
import styles from "./Chat.module.scss";
import { useSelectedChat } from "../../store";

export default function Chat() {
    const [selectedChat, setSelectedChat] = useSelectedChat();

    const [messages, setMessages] = useState([
        {
            content: "Hola hermano",
            ownMessage: false   
        },
        {
            content: "Hola",
            ownMessage: true
        }
    ]);

    const addMessage = (message: string) => {
        setMessages([{
            content: message,
            ownMessage: true
        }, ...messages]);
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
            <TopChatBar name="Mario" pfpUrl="http://localhost:8000/api/images/default-pfp"/>
            <ChatContent messages={messages}/>
            <MessageInput addMessage={addMessage}/>
        </div>
    )
}