"use client";

import styles from "./PendingJobs.module.scss";
import StarSVG from "@/components/SVGs/Star";
import { svgColor } from "@/utils/extra/utils";

type PendingJobProps = {
    title: string;
    workerPfpUrl: string;
    workerName: string;
    workerRating: string;
    jobId: string;
};

export default function PendingJob({title, workerPfpUrl, workerName, workerRating, jobId}: PendingJobProps) {
    const svgClr = svgColor();

    return (
        <div className={styles.pendingJobContainer}>
            <header className={styles.title}>
                <span style={{fontWeight: "600"}}>Trabajo: </span> 
                <a target="_blank" href={"/posting/" + jobId} className={styles.link}>{title}</a>
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