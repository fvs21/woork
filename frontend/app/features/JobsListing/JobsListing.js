import styles from "./JobsListing.module.scss";
import JobPosting from "../../components/JobPosting/JobPosting";
import {determineCategoryForQuery} from "../../utils/postings/postingUtils";
import { useQueryPostingsByCategoryAndState } from "../../hooks/postings";

export default function JobListing({category}) {
    const queryCategory = determineCategoryForQuery(category);
    const { data, isLoading } = useQueryPostingsByCategoryAndState(queryCategory, "Yucatan");

    if(isLoading) {
        return
    }

    return (
        <>
            <div className={styles['jobs-listing-container']}>
                {data?.data.map(function(posting, i) {
                        return <JobPosting key={i} href={"/"} imgSrc={posting.images[0].imageUrl} title={posting.title}
                            description={posting.description} price={`${posting.price}`}
                            author={posting.author} />
                    })
                }
            </div>
        </>
    )
}
