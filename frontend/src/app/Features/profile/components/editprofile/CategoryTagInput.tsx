import { CategoriesList, Category } from '@/services/Categories';
import CategoryTag from '../CategoryTag';
import styles from './Edit.module.scss';
import { useState } from 'react';
import UnaddedCategoryTag from '../CategoryTag/UnaddedCategoryTag';

export default function CategoryTagInput({categories, setCategories}: { categories: Category[]; setCategories: (categories: Category[]) => void }) {
    const [editMode, setEditMode] = useState(false);

    const unusedCategories = CategoriesList.filter(category => !categories.includes(category));

    function deleteCategory(category: Category) {
        let cat = [...categories];
        cat.splice(cat.indexOf(category), 1);
        setCategories(cat);
    }

    function addCategory(category: Category) {
        setCategories([...categories, category])
    }

    return (
        <div>
            <div className={styles.categoriesList}>
                {categories.map((category, i) => {
                    return (
                        <CategoryTag category={category} editMode={editMode} deleteCategory={deleteCategory} key={category.name}/>
                    );
                })}
                {editMode &&
                    unusedCategories.map((category, i) => {
                        return (
                            <UnaddedCategoryTag category={category} addCategory={addCategory} key={category.name}/>
                        );
                    })
                }
            </div>
            <button className={styles.editButton} onClick={() => setEditMode(!editMode)}>
                {editMode ? "Guardar" : "Editar"}
            </button>
        </div>
    );
}
