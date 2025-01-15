import { Category } from "@/services/Categories";
import styles from "./CategoryTag.module.scss";
import TrashcanSVG from "@/components/SVGs/Trashcan";
import { useState } from "react";

type CategoryTagProps = {
    category: Category;
    editMode: boolean;
    deleteCategory: (category: Category) => void;
}

export default function CategoryTag({category, editMode, deleteCategory}: CategoryTagProps) {
    const [showDelete, setShowDelete] = useState(false);

    const Icon = category.icon;

    return (
        <div 
            className={`${styles.categoryTag} ${editMode ? styles.editMode : ""}`} 
            onMouseEnter={() => setShowDelete(true)} 
            onMouseLeave={() => setShowDelete(false)}
            onClick={() => editMode && deleteCategory(category)}
        >
            <Icon width={20} color={"var(--text-color)"}/>
            {category.name}

            {editMode && showDelete && 
                <span className={styles.deleteIcon}>
                    <TrashcanSVG width={"20px"} color={"var(--text-secondary-color)"}/>
                </span>
            }
        </div>
    )
}