import { NewMessagePayload } from "@/features/notifications/types"
import styles from "../Notification.module.scss";
import Link from "next/link";
import { formatNotificationDate } from "@/features/notifications/utils";

type NewMessageNotificationProps = {
    payload: NewMessagePayload;
    createdAt: string;
}

export default function NewMessageNotification({payload, createdAt}: NewMessageNotificationProps) {
    return (
        <> 
            <div className={styles.postingApplicationNotificationBody}>
                <Link className={styles.notificationUserLink} href={payload.senderProfileUrl}>{payload.senderName}</Link>
                &nbsp;te ha enviado un mensaje.
                <div className={styles.createdAt}>{formatNotificationDate(createdAt)}</div>
            </div>
            <div className={styles.acceptButtonContainer}>
                <button>Ver</button>
            </div>
        </>
    )
}