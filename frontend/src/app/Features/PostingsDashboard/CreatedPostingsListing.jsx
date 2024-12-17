import CreatedPostingCard from "@/components/CreatedJobCard/CreatedPostingCard";
import styles from "./PostingsDashboard.module.scss";

export default function CreatedPostingsListing({postings}) {
    if(postings.length == 0) {
        return <div style={{fontSize: "18px", width: "100%", textAlign: "center", fontWeight: "500"}}>
            No has creado ninguna pubicación
        </div>
    }
    return (
        <div className={styles.createdPostingsListing}>
            {postings.map(function(p, i) {
                const posting = p;
                return <CreatedPostingCard 
                    key={posting.url}
                    title={posting.title} 
                    description={posting.description} 
                    price={posting.price}
                    category={posting.category}
                    images_urls={posting.images_urls}
                    location_name={posting.location_name}
                    id={posting.url} />
            })}
        </div>
    )
}