import Message from "../Message/Message";
import styles from "./ChatContent.module.scss";

export default function ChatContent({messages}) {
    return ( 
        <div className={styles.chatContent}>
            {messages.map(function(msg, i) {
               return (
                <Message key={i} content={msg.content} ownMessage={msg.ownMessage} />
               ) 
            })}
        </div>
    )
}