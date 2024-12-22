"use client";

import Link from "next/link";
import styles from "./PendingJob.module.scss";
import StarSVG from "../SVGs/Star";
import { svgColor } from "@/utils/extra/utils";

export default function PendingJob({title, workerPfpUrl, workerName, workerRating, jobLink}) {
    const svgClr = svgColor();

    return (
        <div className={styles.pendingJobContainer}>
            <header className={styles.title}>
                <span style={{fontWeight: "600"}}>Trabajo: </span> <Link href={"#"} className={styles.link}>{title}</Link>
            </header> 
            <div className={styles.workerPfpContainer}>
                <img className={styles.workerPfp} src={workerPfpUrl} onClick={() => {}}/>
            </div>
            <div className={styles.workerNameContainer}> 
                <div style={{fontWeight: "600"}}>Trabajador aceptado:</div>
                <div className={styles.workerName}>{workerName}</div>
                <div className={styles.rating}>
                    {workerRating}
                    <StarSVG width={"16px"} color={svgClr}/>
                </div>
            </div>
            <div className={styles.sendMsgBtnContainer}>
                <button className={styles.sendMsgBtn}>Enviar mensaje</button>
            </div>
        </div>
    )
}