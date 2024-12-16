import { formatNotificationDate } from "@/Utils/notification";
import styles from "./Notifications.module.scss";
import axios from "@/api/axios";

export default function Notification({ id, read, message, createdAt }) {
    const hideNotification = async (id) => {
        try {
            const request = await axios.put("/notification/hide", {
                notification_id: id
            });
            console.log(request);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div
            className={`${styles.notification} ${
                read ? styles.read : styles.notRead
            }`}
        >
            <div className={styles.notReadDotContainer}>
                {!read && (
                    <div className={styles.notReadDot}></div>
                )}
            </div>
            <div>
                <div className={styles.message}>{message}</div>
                <div className={styles.createdAt}>
                    {formatNotificationDate(createdAt)}
                </div>
            </div>
            <div className={styles.btnContainer}>
                <button className={styles.notificationBtn}>Revisar</button>
            </div>
        </div>
    );
}
