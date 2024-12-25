import styles from "./MainMessagesSection.module.scss";

export default function MainMessagesSection({children}) {
    return (
        <div className={styles.mainMessagesSectionContainer}>
            {children}
        </div>
    )
}