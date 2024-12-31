import dayjs from "dayjs";
import styles from "./Message.module.scss";
import { memo } from "react";

type MessageProps = {
    content: string;
    ownMessage: boolean;
    displayReadAt?: boolean;
    readAt?: string;
}

function Message({content, ownMessage, displayReadAt = false, readAt}: MessageProps) {
    return (
        <div className={`${styles.messageContainer} ${ownMessage ? styles.ownMessageContainer : styles.otherMessageContainer}`}>
            <div className={`${styles.message} ${ownMessage ? styles.ownMessage : styles.otherMessage}`}>
                {content}
            </div>
            {displayReadAt &&
                <div className={styles.readDate}>
                    Leido: {dayjs(readAt).format("HH:mm")}
                </div>
            }
        </div>
    )
}

export default memo(Message);