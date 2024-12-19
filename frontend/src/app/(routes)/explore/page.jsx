import Navbar from "@/components/Navbar/Navbar";
import styles from "./Explore.module.scss";
import JobFilters from "@/features/jobfilters/JobFilters";

export const metadata = {
    title: "Woork - Explorar trabajos"
}

export default function Page() {
    return (
        <main className={styles.container}>
            <header className={styles.topMenu}>
                <Navbar />
                <JobFilters />
            </header>
        </main>
    )
}