import styles from "./JobPosting.module.scss";
import PostingImagesDisplay from "../PostingImagesDisplay/PostingImagesDisplay";

export default function JobPosting({href, images, title, description, price, creator}) {
    return (
        <div className={styles.posting}>
            <a target="_blank" style={{textDecoration: "none"}} href={href}>
                <div className={styles.postingPhotoContainer}>
                    <PostingImagesDisplay className={styles.postingImagesDisplay} urls={images} />
                </div>
                <div className={styles.postingInformation}>
                    <div className={styles.postingTitle}>{title}</div>
                    <div className={styles.postingDescription}>{description}</div>
                    <div className={styles.postingPrice}>Paga: ${price}</div>
                    <div className={styles.postingAuthor}>Creador: {creator}</div>
                </div>
            </a>
        </div>
    )
}