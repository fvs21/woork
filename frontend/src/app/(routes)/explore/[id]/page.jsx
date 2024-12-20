import Navbar from "@/components/Navbar/Navbar";
import styles from "../Explore.module.scss";
import JobFilters from "@/features/explore/JobsFilter/JobFilters";
import JobsListings from "@/features/explore/JobsListing/JobsListing";
import { Categories } from "@/services/Categories";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Woork - Explorar trabajos"
}

export default async function Page({params, searchParams}) {
    const searchQuery = await searchParams;
    const category_tag = searchQuery?.category_tag || Categories.Jardinería;

    const categories = Object.entries(Categories);

    if(!categories.some(cat => cat[1] == category_tag))
        notFound();

    const id = params.id;

    return (
        <main className={styles.container}>
            <header className={styles.topMenu}>
                <Navbar />
                <JobFilters location={id} />
            </header>
            <section style={{paddingTop: "180px"}}>
                <JobsListings location={id} />
            </section>
        </main>
    )
}