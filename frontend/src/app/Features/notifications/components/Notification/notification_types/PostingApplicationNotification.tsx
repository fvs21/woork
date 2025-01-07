import Link from "next/link";
import { PostingApplicationPayload } from "../../../types";
import styles from "../Notification.module.scss";
import { formatNotificationDate } from "@/features/notifications/utils";

type PostingApplicationNotificationProps = {
    payload: PostingApplicationPayload;
    createdAt: string;
}

export default function PostingApplicationNotification({payload, createdAt}: PostingApplicationNotificationProps) {
    return (
        <>
            <div className={styles.postingApplicationNotificationBody}>
                <Link className={styles.notificationUserLink} href={payload.applicantProfileUrl}>{payload.applicantName}</Link>
                &nbsp;ha enviado una solicitud para <Link className={styles.notificationUserLink} href={payload.postingLink}>{payload.postingTitle}</Link>
                <div className={styles.createdAt}>{formatNotificationDate(createdAt)}</div>
            </div>
            <div className={styles.acceptButtonContainer}>
                <button className={styles.acceptApplicantBtn}>Aceptar</button>
                <button className={styles.rejectApplicantBtn}>Rechazar</button>
            </div>
        </>
    )
}