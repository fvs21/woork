import { useNotifications } from "../../api";
import Notification from "../Notification/Notification";
import styles from "./NotificationsDropdown.module.scss";

export default function NotificationsDropdown() {
    const { data, isLoading } = useNotifications();

    if(isLoading) {
        return <></>
    }

    return (
        <div className={styles.notificationsDropdownContent}>
            <div className={styles.title}>
                Notificaciones
            </div>
            <hr style={{margin: 0}} className="hr-line" />
            <ul className={styles.notificationsList}>
                {data.map(function(not, i) {
                    return (
                        <Notification key={not.id} notification={not} />
                    )
                })}
            </ul>
        </div>
    )
}