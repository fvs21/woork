"use client"

import CloseSVG from "@/components/SVGs/Close";
import styles from "./Sidebar.module.scss";
import { svgColor } from "@/utils/extra/utils";

export default function Sidebar() {
    const svgClr = svgColor();

    return (
        <div className={styles.sideBarContainer}>
            <div className={styles.shrinkButtonContainer}>
                <button className={styles.shrinkButton}>
                    <CloseSVG width="20px" color={svgClr}/>
                </button>
            </div>
            <div className={styles.menuContainer}>
                <button className={`${styles.menuItem} ${styles.selected}`}>
                    Principal
                </button>
                <button className={styles.menuItem}>
                    Editar perfil
                </button>
                <button className={styles.menuItem}>
                    Ingresos
                </button>
            </div>
        </div>
    )
}