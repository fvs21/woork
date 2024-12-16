import { usePage } from "@inertiajs/react";
import styles from "./JobsListing.module.scss";
import JobPosting from "@/Components/JobPosting/JobPosting";

export default function JobsListings() {
    const postings = usePage().props.postings;

    if(postings.data.length == 0) {
        return (
            <div className={styles['noPostings']}>
                No hay ningún anuncio de trabajo que cumpla con los filtros de búsqueda...
            </div>
        )
    }

    return (
        <div className={styles.jobsListingContainer}>
            {postings.data?.map(function(posting, i) {
                    return <JobPosting 
                                key={i} 
                                href={"/posting/" + posting.url} 
                                images={posting.images_urls} 
                                title={posting.title}
                                description={posting.description} 
                                price={`${posting.price}`}
                                creator={posting.creator} />
                })
            }
        </div>
    )
}