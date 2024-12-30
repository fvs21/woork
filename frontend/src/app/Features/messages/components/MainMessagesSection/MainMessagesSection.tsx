"use client"

import { useLayoutEffect, useState } from "react";
import { useSelectedChat } from "../../store";
import styles from "./MainMessagesSection.module.scss";

export default function MainMessagesSection({children}) {
    const [, setSelectedChat] = useSelectedChat();
    const [isLoading, setIsLoading] = useState(true); 

    useLayoutEffect(() => {
        setSelectedChat(null);
        setIsLoading(false);
    }, []);

    if(isLoading)
        return (<></>)

    return (
        <div className={styles.mainMessagesSectionContainer}>
            {children}
        </div>
    )
}