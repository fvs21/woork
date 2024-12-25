import StarSVG from "@/components/SVGs/Star";
import styles from "./Applicants.module.scss";
import { svgColor } from "@/utils/extra/utils";
import MutationButton from "@/components/MutationButton";

type ApplicantProps = {
    id: number;
    pfpUrl: string;
    username: string;
    name: string;
    rating: string;
    accept: (applicantId: number) => void;
    acceptInvalid: boolean;
}

export default function Applicant({id, pfpUrl, username, name, rating, accept, acceptInvalid}: ApplicantProps) {
    const svgClr = svgColor();

    return (
        <div className={styles.applicantContainer}>
            <div className={styles.applicantPfpContainer}>
                <img className={styles.applicantPfp} src={pfpUrl}/>
            </div>
            <div className={styles.applicantInformation}>
                <a target="_blank" className={styles.applicantName} href={`/profile/show/${username}`}>{name}</a>
                <div className={styles.applicantRating}>
                    {rating}
                    <StarSVG width={"14px"} color={svgClr} />
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <MutationButton 
                    classname={`${styles.acceptBtn} ${styles.applicantBtn}`} 
                    click={() => accept(id)}
                    disable={acceptInvalid}>
                        Aceptar
                </MutationButton>
                <button className={`${styles.rejectBtn} ${styles.applicantBtn}`}>Rechazar</button>
            </div>
        </div>
    )
} 