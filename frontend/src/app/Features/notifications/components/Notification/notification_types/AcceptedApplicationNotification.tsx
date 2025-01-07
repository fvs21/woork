import { AcceptedApplicationPayload } from "@/features/notifications/types";
import styles from "../Notification.module.scss";
import Link from "next/link";

type AcceptedApplicationNotificationProps = {
    payload: AcceptedApplicationPayload;
}

export default function AcceptedApplicationNotification({payload}: AcceptedApplicationNotificationProps) {
    return (
        <>
            <div className={styles.postingApplicationNotificationBody}>
                <Link className={styles.notificationUserLink} href={payload.creatorProfileUrl}>{payload.creatorName}</Link>
                &nbsp;ha enviado una solicitud para <Link className={styles.notificationUserLink} href={payload.postingUrl}>{payload.postingTitle}</Link>
            </div>
            <div>
                <Link href={"/work#pId_" + payload.pendingJobId}>Ir</Link>
            </div> 
        </>
    )
}