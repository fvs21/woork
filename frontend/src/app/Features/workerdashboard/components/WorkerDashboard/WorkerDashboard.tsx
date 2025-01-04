"use client"

import { useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import styles from "./WorkerDashboard.module.scss";
import { determineWorkerDashboardPanel } from "../../utils";

export default function WorkerDashboard() {
    const [option, setOption] = useState(0);
    
    return (
        <div className={styles.workerDashboardContainer}>
            <Sidebar option={option} setOption={setOption}/>
            <div className={styles.panelsContainer}>
                {determineWorkerDashboardPanel(option)}
            </div>
        </div>
    )
}