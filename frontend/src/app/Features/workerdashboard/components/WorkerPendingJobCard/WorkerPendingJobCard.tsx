import StarSVG from "@/components/SVGs/Star";
import { Coordinates, Host } from "../../types";
import PostingLocationMap from "../PostingLocationMap/PostingLocationMap";
import styles from "./WorkerPendingJobCard.module.scss";
import { svgColor } from "@/utils/extra/utils";
import Link from "next/link";

type WorkerPendingJobCardProps = {
    jobId: number;
    host: Host;
    postingUrl: string;
    postingTitle: string;
    postingDescription: string;
    location: Coordinates;
    aproximate: boolean;
    chatId?: number;
};

export default function WorkerPendingJobCard(
    {jobId, host, postingUrl, postingTitle, postingDescription, location, aproximate, chatId}: WorkerPendingJobCardProps
) {
    const svgClr = svgColor();

    return (
        <div className={styles.workerPendingJobCard}>
            <Link className={styles.title} href={"/posting/" + postingUrl}>
                {postingTitle}
            </Link> 
            <div className={styles.description}>
                {postingDescription}
            </div>
            <div className={styles.mapContainer}>
                <PostingLocationMap latitude={location.latitude} longitude={location.longitude} aproximate={aproximate} />
            </div>
            <div className={styles.creatorInformationContainer}>
                <span style={{fontWeight: 500}}>Creador: </span>
                <div className={styles.creatorInformation}>
                    <div className={styles.pfpContainer}>
                        <img 
                            className={styles.pfp} 
                            src={host.pfpUrl}
                        />
                    </div>
                    <div className={styles.nameAndRating}>
                        <Link href={"/profile/show/" + host.username} className={styles.name}>
                            {host.name}
                        </Link>
                        <span className={styles.rating}>
                            4.78
                            <StarSVG width={"18px"} color={svgClr} />    
                        </span> 
                    </div>
                </div>
            </div>
            <button className={styles.contactButton}>
                Contactar
            </button>
        </div>
    )
}