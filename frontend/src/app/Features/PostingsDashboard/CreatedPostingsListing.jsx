"use client";

import CreatedPostingCard from "@/components/CreatedJobCard/CreatedPostingCard";
import styles from "./PostingsDashboard.module.scss";
import { useCreatedPostings, useDeletePosting } from "@/api/hooks/postings";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { useQueryClient } from "react-query";

export default function CreatedPostingsListing() {
    const { data: postings, isLoading } = useCreatedPostings();
    const { deletePosting } = useDeletePosting();
    const queryClient = useQueryClient();

    if(isLoading)
        return <LoadingScreen />

    if(postings.length == 0) {
        return <div style={{fontSize: "18px", width: "100%", textAlign: "center", fontWeight: "500"}}>
            No has creado ninguna pubicación
        </div>
    }

    const handleDelete = async (id) => {
        try {
            await deletePosting(id);
            let postings = queryClient.getQueryData(['created-postings']);
            postings = postings.filter(posting => posting.url != id);
            queryClient.setQueryData(['created-postings'], postings);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.createdPostingsListing}>
            {postings.map(function(posting, i) {
                return (
                    <CreatedPostingCard 
                        key={posting.url}
                        title={posting.title} 
                        description={posting.description} 
                        price={posting.price}
                        category={posting.category}
                        images_urls={posting.images_urls}
                        location_name={posting.location_name}
                        id={posting.url}
                        deletePosting={() => handleDelete(posting.url)}
                    />
                )
            })}
        </div>
    )
}