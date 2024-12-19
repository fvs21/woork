import InputLabel from "../ValidatedInput/InputLabel";
import styles from "./CategorySelector.module.scss";
import { Categories } from "@/services/Categories";

export default function CategorySelector({value, setValue, label, className}) {
    
    return (
        <div className={`${styles['category-selector-container']}`}>
            {label && <InputLabel>{label}</InputLabel>}
            <select 
                name="category" 
                className={`${styles['categories-selector']} ${className}`} 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                required
            >
                <option value={""} disabled>Categoría</option>
                {Object.keys(Categories).map(function(cat, i) {
                    return <option key={Categories[cat]} value={Categories[cat]}>{cat}</option>
                })}
            </select>  
        </div>
    );
}