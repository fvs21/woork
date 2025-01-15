import { Category } from "@/services/Categories";
import styles from "./CategoryTag.module.scss";
import { useState } from "react";
import UploadSVG from "@/components/SVGs/Upload";

type UnaddedCategoryTagProps = {
    category: Category;
    addCategory: (category: Category) => void;
}

export default function UnaddedCategoryTag({category, addCategory}: UnaddedCategoryTagProps) {
    const [showAdd, setShowAdd] = useState(false);

    const Icon = category.icon;
    return (
        <div 
            className={`${styles.categoryTag} ${styles.tagNotAdded}`} 
            onMouseEnter={() => setShowAdd(true)} 
            onMouseLeave={() => setShowAdd(false)}
            onClick={() => addCategory(category)}
        >
            <Icon width={20} color={"var(--text-color)"}/>
            {category.name}

            {showAdd && 
                <span className={styles.deleteIcon}>
                    <UploadSVG width={"20px"} color={"var(--text-secondary-color)"}/>
                </span>
            }
        </div>
    )
}