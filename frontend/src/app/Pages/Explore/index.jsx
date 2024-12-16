import Navbar from "@/Components/Navbar/Navbar";
import { useState } from 'react';
import "../../../css/globals.scss";
import Searchbar from "../../Components/Searchbar/Searchbar";
import { Head } from "@inertiajs/react";
import JobsListings from "@/Features/JobsListing/JobsListing";
import styles from "./Explore.module.scss";
import JobFilters from "@/Features/JobFilters/JobFilters";

export default function Explore({ auth, category_tag }) {
    const [category, setCategory] = useState(category_tag);

    return (
        <main className={styles.container}>
            <Head title="Explorar" />
            <header className={styles.topMenu}>
                <Navbar 
                    loggedIn={auth.user.data.length !== 0}/>
                <JobFilters 
                    category={category} 
                    setCategory={setCategory} />
            </header>
            <section style={{paddingTop: "180px"}}>
                <JobsListings 
                    category={category} />
            </section>
        </main>
    )
}