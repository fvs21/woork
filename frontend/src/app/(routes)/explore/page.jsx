import Navbar from "@/components/Navbar/Navbar";
import styles from "./Explore.module.scss";
import JobFilters from "@/features/explore/JobsFilter/JobFilters";
import JobsListings from "@/features/explore/JobsListing/JobsListing";

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
            <section style={{paddingTop: "180px"}}>
                <JobsListings />
            </section>
        </main>
    )
}