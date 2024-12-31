"use client"

import ChatContent from "../ChatContent/ChatContent";
import MessageInput from "../MessageInput/MessageInput";
import TopChatBar from "../TopChatBar/TopChatBar";
import styles from "./Chat.module.scss";
import { useSelectedChat, useStompClient } from "../../store";
import { MessagePayload } from "../../types";

export default function Chat() {
    const [selectedChat] = useSelectedChat();
    const [stompClient] = useStompClient();

    const addMessage = (message: string) => {
        if(selectedChat.create) {
            stompClient.send("/app/chat.create", {}, JSON.stringify({
                "receiver": selectedChat.recipient.username,
                "content": message,
                'type': 'TEXT'
            } as MessagePayload)); 

            return;
        }

        stompClient.send("/app/chat.sendMessage/" + selectedChat.chatId, {}, JSON.stringify({
            "receiver": selectedChat.recipient.username,
            "content": message,
            'type': 'TEXT'
        } as MessagePayload));
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
            <TopChatBar name={selectedChat.recipient.name} pfpUrl={selectedChat.recipient.pfpUrl} username={selectedChat.recipient.username}/>
            <ChatContent chatId={selectedChat.chatId}/>
            <MessageInput addMessage={addMessage}/>
        </div>
    )
}