import Navbar from "@/components/Navbar/Navbar";
import styles from "./Explore.module.scss";
import JobFilters from "@/features/explore/JobsFilter/JobFilters";
import JobsListings from "@/features/explore/JobsListing/JobsListing";
import { Categories } from "@/services/Categories";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Woork - Explorar trabajos"
}

export default async function Page({searchParams}) {
    const searchQuery = await searchParams;
    const category_tag = searchQuery?.category_tag || Categories.Jardinería;

    const categories = Object.entries(Categories);

    if(!categories.some(category => category[1] == category_tag))
        notFound();
    
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