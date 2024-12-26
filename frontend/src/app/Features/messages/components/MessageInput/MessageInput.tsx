import { useRef, useState } from "react";
import styles from "./MessageInput.module.scss";

export default function MessageInput({addMessage}) {
    const [message, setMessage] = useState<string>("");
    const inputRef = useRef(null);

    const sendMessage = (e) => {
        e.preventDefault();

        if(message.trim().length == 0)
            return;

        addMessage(message);
        setMessage("");
        inputRef.current.style.height = "";
    }

    const input = (e) => {
        if(e.target.scrollHeight < 150) {
            e.target.style.height = "";
            e.target.style.overflowY = 'hidden';
            e.target.style.height = e.target.scrollHeight + "px";
        } else {
            e.target.style.overflowY = 'scroll';
            e.target.scrollTop = e.target.scrollHeight - e.target.clientHeight;
        }
    }

    return (
        <footer className={styles.messageInputContainer}>
            <form className={styles.messageForm} onSubmit={sendMessage}>
                <textarea 
                    spellCheck={false}
                    ref={inputRef}
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className={styles.messageInput} 
                    placeholder="Mensaje..."
                    onKeyDown={(e) => {
                        if(e.key === 'Enter' && !e.shiftKey)
                            sendMessage(e);
                    }}
                    onInput={input}
                    autoFocus={true}
                />
                <button className={styles.sendMessageButton} type="submit">
                    Enviar
                </button>
            </form>
        </footer>
    )
}