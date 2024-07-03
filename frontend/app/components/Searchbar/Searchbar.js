import Search from "../SVGs/Search";
import styles from "./Searchbar.module.scss";
import "../../assets/globals.scss";
import { useState } from "react";

export default function Searchbar() {
    const [active, setActive] = useState(false);

    const focus = () => {
        setActive(!active);
    }

    return (
        <div className={styles['searchbar-container']}>
            <div className={`${styles['search-bar']} ${active ? "border-primary" : "border-main"}`}>
                <input onFocus={focus} onBlur={focus} className={styles['search-bar-input']} type="text" placeholder="Buscar trabajos"/>
                <div className={styles['search-icon']}>
                    <button className={styles['search-btn']}>
                        <Search width={"25px"} color={"gray"} />
                    </button>
                </div>
            </div>
        </div>
    )
}