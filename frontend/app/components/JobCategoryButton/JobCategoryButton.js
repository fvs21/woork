import styles from "./JobCategoryButton.module.scss";

export default function JobCategoryButton({name, selected, click, icon}) {
    return (
        <button className={`${styles['category-btn']} ${selected ? styles['selected'] : ""}`} onClick={click}>
            <div className={styles["category-icon"]}>
                {icon}
            </div>
            <div>
                {name}
            </div>
        </button>
    )
}