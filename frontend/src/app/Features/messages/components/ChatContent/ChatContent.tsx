import { useUser } from "@/api/hooks/user";
import { useLoadChat } from "../../api";
import Message from "../Message/Message";
import styles from "./ChatContent.module.scss";

type ChatContentProps = {
    chatId?: number;
}

export default function ChatContent({chatId}: ChatContentProps) {
    const { data, isLoading } = useLoadChat(chatId);
    const [user] = useUser();

    if(isLoading)
        return (<div className={styles.chatContent}></div>)

    return ( 
        <div className={styles.chatContent}>
            {data.messages.map(function(msg, i) {
               return (
                <Message key={i} content={msg.content} ownMessage={msg.sender.username == user.username} />
               ) 
            })}
        </div>
    )
}