import PostingImagesDisplay from "../PostingImagesDisplay/PostingImagesDisplay";
import styles from "./CreatedPostingCard.module.scss";
import { useState } from "react";
import PostingControllerModal from "./PostingControllerModal";


export default function CreatedPostingCard({title, id, description, price, images_urls, category, location_name}) {
    const [onClickModal, setOnClickModal] = useState(false);

    function deletePosting(e) {
        e.stopPropagation();
        e.preventDefault();

        router.delete(`/posting/${id}`, {
            preserveScroll: true
        });
        setOnClickModal(false);
    }

    return (
        <>
            <div className={styles.createdJobCardContainer} onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setOnClickModal(true);
            }}>
                <div className={styles.imageContainer}>
                    <PostingImagesDisplay 
                        className={styles.imagesDisplay}
                        urls={images_urls} />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.postingTitle}>
                        {title}
                    </div>
                    <div className={styles.postingDescription}>
                        {description}
                    </div>
                    <div className={styles.postingPrice}>
                        Paga: ${price}
                    </div>
                    <div className={styles.postingCategory}>
                        Categoría: {category}
                    </div>
                    <div className={styles.postingLocation}>
                        Ubicación: {location_name}
                    </div>
                </div>
            </div>
            { onClickModal && 
                <PostingControllerModal title={title} id={id} closeModal={() => setOnClickModal(false)} deleteFn={deletePosting}/>
            }
        </>
    )
}
