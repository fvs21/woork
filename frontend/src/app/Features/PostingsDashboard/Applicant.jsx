import StarSVG from "@/Components/SVGs/Star";
import styles from "./PostingsDashboard.module.scss";
import { svgColor } from "@/Utils/extra/utils";

export default function Applicant({pfpUrl, username, name, rating}) {
    return (
        <div className={styles.applicantContainer}>
            <div className={styles.applicantPfpContainer}>
                <img className={styles.applicantPfp} src={pfpUrl}/>
            </div>
            <div className={styles.applicantInformation}>
                <a target="_blank" className={styles.applicantName} href={`/profile/show/${username}`}>{name}</a>
                <div className={styles.applicantRating}>
                    {rating}
                    <StarSVG width={"14px"} color={svgColor()} />
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button className={`${styles.acceptBtn} ${styles.applicantBtn}`}>Aceptar</button>
                <button className={`${styles.rejectBtn} ${styles.applicantBtn}`}>Rechazar</button>
            </div>
        </div>
    )
} 