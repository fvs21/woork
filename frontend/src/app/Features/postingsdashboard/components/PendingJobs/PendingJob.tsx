"use client";

import styles from "./PendingJobs.module.scss";
import StarSVG from "@/components/SVGs/Star";
import { useSelectedChat } from "@/features/messages/store";
import { Participant, SelectedChat } from "@/features/messages/types";
import { svgColor } from "@/utils/extra/utils";
import { useRouter } from "next/navigation";

type PendingJobProps = {
    title: string;
    workerPfpUrl: string;
    workerName: string;
    workerRating: string;
    workerUsername: string;
    jobId: string;
    chatCreated: boolean;
    chatId?: number;
};

export default function PendingJob({title, workerPfpUrl, workerName, workerUsername, workerRating, jobId, chatCreated, chatId}: PendingJobProps) {
    const svgClr = svgColor();
    const [, setSelectedChat] = useSelectedChat();
    const router = useRouter();
    

    function sendMessage() {
        const recipient: Participant = {
            name: workerName,
            pfpUrl: workerPfpUrl,
            username: workerUsername
        };

        if(chatCreated) {
            const chatSelection: SelectedChat = {
                recipient: recipient,
                chatId: chatId,
                create: false
            };

            setSelectedChat(chatSelection);
        } else {
            const chatSelection: SelectedChat = {
                recipient: recipient,
                create: true
            };

            setSelectedChat(chatSelection);
        }

        router.push("/messages");
    }

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
                <button className={styles.sendMsgBtn} onClick={sendMessage}>Enviar mensaje</button>
            </div>
        </div>
    )
}