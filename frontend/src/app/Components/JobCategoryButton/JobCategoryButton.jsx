import { useEffect, useRef } from "react";
import styles from "./JobCategoryButton.module.scss";

export default function JobCategoryButton({name, selected, click, icon}) {
    const ref = useRef(null);

    useEffect(() => {
        if(selected) {
            ref.current.scrollIntoView({behavior: "instant", inline: "center"});
        }
    }, []);

    const Icon = icon;

    return (
        <button 
            ref={ref}
            className={`${styles['category-btn']} 
            ${selected ? styles['selected'] : ""}`} 
            onClick={click}>
                <div className={styles["category-icon"]}>
                    <Icon width={"22px"} color={selected ? "var(--text-color)" : "var(--text-secondary-color)"}/>
                </div>
                <div>
                    {name}
                </div>
        </button>
    )
}