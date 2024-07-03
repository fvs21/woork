import Link from "next/link";
import styles from "./JobPosting.module.scss";

export default function JobPosting({href, imgSrc, title, description, price, author}) {
    return (
        <div className={styles['posting']}>
            <Link style={{textDecoration: "none"}} href={href}>
                <div className={styles['posting-photo-container']}>
                    <img className={styles['posting-photo']} src={imgSrc} />
                </div>
                <div className={styles['posting-information']}>
                    <div className={styles['posting-title']}>{title}</div>
                    <div className={styles['posting-description']}>{description}</div>
                    <div className={styles['posting-price']}>${price}/hora</div>
                    <div className={styles['posting-author']}>Creador: {author}</div>
                </div>
            </Link>
        </div>
    )
}