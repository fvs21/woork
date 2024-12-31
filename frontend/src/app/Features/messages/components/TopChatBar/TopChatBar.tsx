import Link from "next/link";
import styles from "./TopChatBar.module.scss";

type TopChatBarProps = {
    name: string;
    pfpUrl: string;
    username: string;
}

export default function TopChatBar({name, pfpUrl, username}: TopChatBarProps) {
    return (
        <div className={styles.topChatBar}>
            <div className={styles.pfpContainer}>
                <img src={pfpUrl} className={styles.pfp} />
            </div>
            <Link className={styles.nameContainer} href={"/profile/show/" + username}>
                {name}
            </Link>
        </div>
    )
}