import { useUser } from "@/api/hooks/user";
import { useLoadChat } from "../../api";
import Message from "../Message/Message";
import styles from "./ChatContent.module.scss";
import { useEffect } from "react";
import { useStompClient } from "../../store";
import { useQueryClient } from "react-query";
import { MessagesListRecipient } from "../../types";

type ChatContentProps = {
    chatId?: number;
}

export default function ChatContent({chatId}: ChatContentProps) {
    const { data, isLoading } = useLoadChat(chatId);
    const [user] = useUser();
    const [stompClient] = useStompClient();
    const queryClient = useQueryClient();

    const messages = data?.messages;
    let lastReadMessageIndex = messages?.findIndex(msg => msg.readAt != null);

    useEffect(() => {
        if(isLoading)
            return;
        
        function readChat() {
            stompClient.send("/app/chat.read/" + chatId);

            let chatList: Array<MessagesListRecipient> = queryClient.getQueryData(['chats']);
            const index: number = chatList.findIndex(elem => elem.chatId == chatId);

            chatList[index].messagesUnread = 0;

            queryClient.setQueryData(['chats'], chatList);
        }

        if(messages && messages[0].readAt == null && messages[0].sender.username != user.username) {
            readChat();
        }

    }, [data?.messages?.length, chatId]);

    if(isLoading)
        return (<div className={styles.chatContent}></div>)

    return ( 
        <div className={styles.chatContent}>
            {messages?.map(function(msg, i) {
                //check if the displayed message if the current user
                const ownMessage = msg.sender.username == user.username;
                if(i == lastReadMessageIndex && messages[i].readAt != null && ownMessage) {
                    return (
                        <Message key={msg.content + msg.sentAt} content={msg.content} ownMessage={true} displayReadAt={true} readAt={msg.readAt}/>
                    )
                }
                return (
                    <Message key={msg.content + msg.sentAt} content={msg.content} ownMessage={ownMessage} />
                ) 
            })}
        </div>
    )
}