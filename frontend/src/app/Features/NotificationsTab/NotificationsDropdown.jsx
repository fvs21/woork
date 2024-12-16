import { useNotifications, useUser } from "@/jotai/user";
import styles from "./Notifications.module.scss";
import { useEffect } from "react";
import axios from "@/api/axios";
import { getUnreadNotificationsCount } from "@/Utils/notification";
import Notification from "./Notification";

export default function NotificationsDropdown() {
    const { notifications, readNotification } = useNotifications();


    function clearReadNotifications() {
        for(let i = 0; i < notifications.length; i++) {
            if(!notifications[i].read) {
                readNotification(i)
            } 
        }
    }

    useEffect(() => {
        async function readNotifications() {
            try {
                axios.post("/notifications_seen");

            } catch(error) {
                console.log(error);
            }
        }

        if(getUnreadNotificationsCount(notifications) > 0)
            readNotifications();

        return () => clearReadNotifications();
    }, []);

    return (
        <div className={styles.notificationsDropdownContent}>
            <div className={styles.title}>
                Notificaciones
            </div>
            <hr style={{margin: 0}} className="hr-line" />
            <ul className={styles.notificationsList}>
                {notifications.length > 0 && 
                    notifications.map(function(notification, i) {
                        return <Notification key={notification.id} id={notification.id} read={notification.read} message={notification.message} createdAt={notification.created_at} /> 
                    })
                }
            </ul>
        </div>
    )
}