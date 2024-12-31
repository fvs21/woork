"use client"

import { svgColor } from "@/utils/extra/utils";
import MessagesList from "../MessagesList/MessagesList";
import styles from "./LeftMessagesTab.module.scss";
import Filter from "@/components/SVGs/Filter";

export default function LeftMessagesTab() {
    const svgClr = svgColor();

    return (
        <div className={styles.leftMessagesTab}>
            <header className={styles.header}>
                <h2 className={styles.title}>
                    Mensajes
                </h2>
                <button className={styles.filtersBtn}>
                    <Filter width={"18px"} color={svgClr}/>
                </button>
            </header>
            <MessagesList /> 
        </div>
    )
}