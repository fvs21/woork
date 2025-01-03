import Sidebar from "../SideBar/Sidebar";
import styles from "./WorkerDashboard.module.scss";

export default function WorkerDashboard() {
    return (
        <div className={styles.workerDashboardContainer}>
            <Sidebar />
        </div>
    )
}