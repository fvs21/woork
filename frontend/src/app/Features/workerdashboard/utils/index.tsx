import WorkerPendingJobs from "../components/WorkerPendingJobs/WorkerPendingJobs";

export function determineWorkerDashboardPanel(option: number) {
    switch(option) {
        case 0:
            return <WorkerPendingJobs />
    }
}