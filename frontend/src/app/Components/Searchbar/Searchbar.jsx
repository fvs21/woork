import Search from "../SVGs/Search";
import styles from "./Searchbar.module.scss";
import "../../../css/globals.scss";
import { useState } from "react";
import useWindowDimensions, { usePageScrollTop } from "@/Hooks/window";
import { svgColor } from "@/Utils/extra/utils";

export default function Searchbar() {
    const [active, setActive] = useState(false);

    const focus = () => {
        setActive(!active);
    }


    return (
        <div className={styles.searchBarContainer}>
            <div className={`${styles.searchBar} ${active && styles.searchBarFocus}`}>
                <input className={styles['search-bar-input']} onFocus={focus} onBlur={focus} type="text" placeholder="Buscar trabajos"/>
                <div className={styles['search-icon']}>
                    <button className={styles['search-btn']}>
                        <Search 
                            width={"25px"} 
                            color={svgColor()} />
                    </button>
                </div>
            </div>
        </div>
    )
}