import Navbar from "@/components/Navbar/Navbar";
import { useState } from 'react';
import JobsListings from "@/features/explore/JobsListing/JobsListing";
import styles from "./Explore.module.scss";
import JobFilters from "@/features/explore/JobsFilter/JobFilters";

export default function Explore({ auth, category_tag }) {
    const [category, setCategory] = useState(category_tag);

    return (
        <main className={styles.container}>
            <header className={styles.topMenu}>
                <Navbar loggedIn={auth.user.data.length !== 0}/>
                <JobFilters category={category} setCategory={setCategory} />
            </header>
            <section style={{paddingTop: "180px"}}>
                <JobsListings category={category} />
            </section>
        </main>
    )
}