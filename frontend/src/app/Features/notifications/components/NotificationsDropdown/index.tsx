import { useNotifications } from "../../api";
import styles from "./NotificationsDropdown.module.scss";

export default function NotificationsDropdown() {
    const { data, isLoading } = useNotifications();

    console.log(data);

    return (
        <div className={styles.notificationsDropdownContent}>
            <div className={styles.title}>
                Notificaciones
            </div>
            <hr style={{margin: 0}} className="hr-line" />
            <ul className={styles.notificationsList}>
                
            </ul>
        </div>
    )
}