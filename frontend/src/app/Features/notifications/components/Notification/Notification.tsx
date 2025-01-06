import { Notification as N } from "../../types";
import styles from "./Notification.module.scss";
import PostingApplicationNotification from "./PostingApplicationNotification";

type NotificationProps = {
    notification: N;
}

export default function Notification({notification}: NotificationProps) {
    function determineNotificationType() {
        switch(notification.type) {
            case "JOB_APPLICATION":
                return <PostingApplicationNotification />
        }
    }

    return (
        <div
            className={`${styles.notification} ${
                notification.read ? styles.read : styles.notRead
            }`}
        >
            <div className={styles.notReadDotContainer}>
                {!notification.read && (
                    <div className={styles.notReadDot}></div>
                )}
            </div>
            {determineNotificationType()}
        </div>
    )
}