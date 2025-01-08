import { AcceptedApplicationPayload, Notification as N, NewMessagePayload, PostingApplicationPayload } from "../../types";
import styles from "./Notification.module.scss";
import AcceptedApplicationNotification from "./notification_types/AcceptedApplicationNotification";
import NewMessageNotification from "./notification_types/NewMessageNotification";
import PostingApplicationNotification from "./notification_types/PostingApplicationNotification";

type NotificationProps = {
    notification: N;
}

export default function Notification({notification}: NotificationProps) {
    function determineNotificationType() {
        switch(notification.type) {
            case "JOB_APPLICATION":
                return <PostingApplicationNotification payload={notification.payload as PostingApplicationPayload} createdAt={notification.createdAt}/>
            case "ACCEPTED_APPLICATION":
                return <AcceptedApplicationNotification payload={notification.payload as AcceptedApplicationPayload} createdAt={notification.createdAt}/>
            case "NEW_MESSAGE":
                return <NewMessageNotification payload={notification.payload as NewMessagePayload} createdAt={notification.createdAt}/>
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