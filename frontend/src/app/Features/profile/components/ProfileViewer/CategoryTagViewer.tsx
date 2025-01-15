import { CategoriesList } from "@/services/Categories";
import styles from "./Profile.module.scss";

export default function CategoryTagViewer({category}: { category: string; }) {
    const cat = CategoriesList.find(cat => cat.tag == category);
    const Icon = cat.icon;
    return (
        <div className={styles.tag}>
            <Icon width={20} />
            {cat.name}
        </div>
    )
}