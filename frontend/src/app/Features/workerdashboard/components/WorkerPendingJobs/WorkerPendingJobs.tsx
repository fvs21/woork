import { useGetWorkerPendingJobs } from "../../api";
import WorkerPendingJobCard from "../WorkerPendingJobCard/WorkerPendingJobCard";
import styles from "./WorkerPendingJobs.module.scss";

export default function WorkerPendingJobs() {
    const { data, isLoading } = useGetWorkerPendingJobs();

    if(isLoading)
        return <></>

    return (
        <div className={styles.pendingJobsContainer}>
            <div className={styles.header}>
                Trabajos por realizar
            </div>
            <div className={styles.pendingJobs}>
                {data.map(function(job, i) {
                    return (
                        <WorkerPendingJobCard 
                            key={job.jobId}
                            jobId={job.jobId}
                            host={job.host}
                            postingUrl={job.postingUrl}
                            postingDescription={job.postingDescription}
                            postingTitle={job.postingTitle}
                            location={job.location}
                            aproximate={job.location_shared_at == null}
                            chatId={job.chatCreated ? job.chatId : null}
                            chatCreated={job.chatCreated}
                        />
                    )
                })}
            </div>
        </div>
    )    
}