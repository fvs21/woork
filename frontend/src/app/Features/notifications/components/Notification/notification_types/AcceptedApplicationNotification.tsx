import { AcceptedApplicationPayload } from "@/features/notifications/types";
import styles from "../Notification.module.scss";
import Link from "next/link";
import { formatNotificationDate } from "@/features/notifications/utils";

type AcceptedApplicationNotificationProps = {
    payload: AcceptedApplicationPayload;
    createdAt: string;
}

export default function AcceptedApplicationNotification({payload, createdAt}: AcceptedApplicationNotificationProps) {
    return (
        <>
            <div className={styles.postingApplicationNotificationBody}>
                <Link className={styles.notificationUserLink} href={payload.creatorProfileUrl}>{payload.creatorName}</Link>
                &nbsp;te ha aceptado para <Link className={styles.notificationUserLink} href={payload.postingUrl}>{payload.postingTitle}</Link>
                <div className={styles.createdAt}>{formatNotificationDate(createdAt)}</div>
            </div>
            <div className={styles.visitBtnContainer}>
                <Link className={styles.visitBtn} href={"/work#pId_" + payload.pendingJobId}>Revisar</Link>
            </div> 
        </>
    )
}