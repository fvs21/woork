import { CategoriesList, Category } from '@/services/Categories';
import CategoryTag from '../CategoryTag';
import styles from './Edit.module.scss';
import { useState } from 'react';
import UnaddedCategoryTag from '../CategoryTag/UnaddedCategoryTag';

export default function CategoryTagInput() {
    const [editMode, setEditMode] = useState(false);

    const [addedCategories, setAddedCategories] = useState([
        CategoriesList[0],
        CategoriesList[1],
        CategoriesList[7]
    ]);

    const unusedCategories = CategoriesList.filter(category => !addedCategories.includes(category));

    function deleteCategory(category: Category) {
        let cat = [...addedCategories];
        cat.splice(cat.indexOf(category), 1);
        setAddedCategories(cat);
    }

    function addCategory(category: Category) {
        setAddedCategories([...addedCategories, category])
    }

    return (
        <div>
            <div className={styles.categoriesList}>
                {addedCategories.map((category, i) => {
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
