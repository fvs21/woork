import Link from "next/link";
import { PostingApplicationPayload } from "../../types";
import styles from "./Notification.module.scss";

type PostingApplicationNotificationProps = {
    payload: PostingApplicationPayload;
}

export default function PostingApplicationNotification({payload}: PostingApplicationNotificationProps) {
    return (
        <>
            <div className={styles.postingApplicationNotificationBody}>
                <Link className={styles.notificationUserLink} href={payload.applicantProfileUrl}>{payload.applicantName}</Link>
                &nbsp;ha enviado una solicitud para <Link className={styles.notificationUserLink} href={payload.postingLink}>{payload.postingTitle}</Link>
            </div>
            <div className={styles.acceptButtonContainer}>
                <button className={styles.acceptApplicantBtn}>Aceptar</button>
                <button className={styles.rejectApplicantBtn}>Rechazar</button>
            </div>
        </>
    )
}