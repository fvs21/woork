import { useGetWorkerPendingJobs } from "../../api";
import styles from "./WorkerPendingJobs.module.scss";

export default function WorkerPendingJobs() {
    const { data, isLoading } = useGetWorkerPendingJobs();

    if(isLoading)
        return <></>

    return (
        <div className={styles.pendingJobsContainer}>
            <div className={styles.header}>
                Trabajos pendientes
            </div>
            <div className={styles.pendingJobs}>
                
            </div>
        </div>
    )    
}