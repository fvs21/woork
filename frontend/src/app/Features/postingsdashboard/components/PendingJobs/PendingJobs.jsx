import PendingJob from "./PendingJob";
import styles from "./PendingJobs.module.scss";

export default function PendingJobs() {
    return (
        <>
            <header className={styles.pendingJobsTitle}>
                Trabajos aceptados
            </header>
            <div className={styles.pendingJobsListing}>
                <PendingJob
                    title={"Podar césped"}
                    workerPfpUrl={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuwdDlddzvp59xlMxH5DV1GlbzTxwxg6f7g&s"
                    }
                    workerName={"Mario Jimenez"}
                    workerRating={4.37}
                />
                <PendingJob
                    title={"Podar césped"}
                    workerPfpUrl={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuwdDlddzvp59xlMxH5DV1GlbzTxwxg6f7g&s"
                    }
                    workerName={"Mario Jimenez"}
                    workerRating={4.37}
                />
                <PendingJob
                    title={"Podar césped"}
                    workerPfpUrl={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuwdDlddzvp59xlMxH5DV1GlbzTxwxg6f7g&s"
                    }
                    workerName={"Mario Jimenez"}
                    workerRating={4.37}
                />
                <PendingJob
                    title={"Podar césped"}
                    workerPfpUrl={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuwdDlddzvp59xlMxH5DV1GlbzTxwxg6f7g&s"
                    }
                    workerName={"Mario Jimenez"}
                    workerRating={4.37}
                />
            </div>
        </>
    );
}
