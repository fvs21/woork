import styles from "./TopChatBar.module.scss";

type TopChatBarProps = {
    name: string;
    pfpUrl: string;
}

export default function TopChatBar({name, pfpUrl}: TopChatBarProps) {
    return (
        <div className={styles.topChatBar}>
            <div className={styles.pfpContainer}>
                <img src={pfpUrl} className={styles.pfp} />
            </div>
            <div className={styles.nameContainer}>
                {name}
            </div>
        </div>
    )
}