"use client";

import { useCurrentJobSessions } from "@/api/hooks/pendingjobs";
import PendingJob from "./PendingJob";
import styles from "./PendingJobs.module.scss";

export default function PendingJobs() {
    const { data, isLoading } = useCurrentJobSessions();

    if(isLoading) {
        return <></>
    }

    return (
        <>
            <header className={styles.pendingJobsTitle}>
                Trabajos aceptados
            </header>
                {data.length > 0 ?
                    <div className={styles.pendingJobsListing}>
                        {data.map(function(job, i) {
                            return (
                                <PendingJob 
                                    key={i}
                                    title={job.postingTitle}
                                    workerPfpUrl={job.worker.pfpUrl}
                                    workerName={job.worker.name}
                                    workerRating={job.worker.rating}
                                    workerUsername={job.worker.username}
                                    jobId={job.postingUrl}
                                    chatCreated={job.chatCreated}
                                    chatId={job?.chatId}
                                />
                            )
                        })}
                    </div>
                    : <div style={{width: "100%", textAlign: "center"}}>No tienes ningun trabajo creado activo</div>
                }
        </>
    );
}
