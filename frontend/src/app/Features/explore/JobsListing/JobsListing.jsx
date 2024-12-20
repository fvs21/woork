"use client";

import { useSearchParams } from "next/navigation";
import styles from "./JobsListing.module.scss";
import JobPosting from "@/components/JobPosting/JobPosting";
import { useFetchPostings } from "@/api/hooks/postings";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

export default function JobsListings() {
    const searchParams = useSearchParams();
    const category_tag = searchParams.get('category_tag');

    const { data, isLoading } = useFetchPostings(category_tag);

    if(isLoading)
        return <LoadingScreen />

    if(data?.postings?.length == 0) {
        return (
            <div className={styles['noPostings']}>
                No hay ningún anuncio de trabajo que cumpla con los filtros de búsqueda...
            </div>
        )
    }

    return (
        <div className={styles.jobsListingContainer}>
            {data?.postings?.map(function(posting, i) {
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