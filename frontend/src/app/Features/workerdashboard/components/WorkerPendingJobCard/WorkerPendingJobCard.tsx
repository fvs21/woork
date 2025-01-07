import StarSVG from "@/components/SVGs/Star";
import { Coordinates, Host } from "../../types";
import PostingLocationMap from "../PostingLocationMap/PostingLocationMap";
import styles from "./WorkerPendingJobCard.module.scss";
import { svgColor } from "@/utils/extra/utils";
import Link from "next/link";
import { useSelectedChat } from "@/features/messages/store";
import { Participant, SelectedChat } from "@/features/messages/types";
import { useRouter } from "next/navigation";

type WorkerPendingJobCardProps = {
    jobId: number;
    host: Host;
    postingUrl: string;
    postingTitle: string;
    postingDescription: string;
    location: Coordinates;
    aproximate: boolean;
    chatId?: number;
    chatCreated: boolean;
};

export default function WorkerPendingJobCard(
    {jobId, host, postingUrl, postingTitle, postingDescription, location, aproximate, chatId, chatCreated}: WorkerPendingJobCardProps
) {
    const svgClr = svgColor();
    const [, setSelectedChat] = useSelectedChat();
    const router = useRouter();


    function sendMessage() {
        const recipient: Participant = {
            name: host.name,
            pfpUrl: host.pfpUrl,
            username: host.username
        };

        if(chatCreated) {
            const chatSelection: SelectedChat = {
                recipient: recipient,
                chatId: chatId,
                create: false
            };

            setSelectedChat(chatSelection);
            router.push("/messages");
        } else {
            const chatSelection: SelectedChat = {
                recipient: recipient,
                create: true
            };

            setSelectedChat(chatSelection);
            router.push("/messages");
        }
    }

    return (
        <div className={styles.workerPendingJobCard}>
            <div className={styles.mapContainer}>
                <PostingLocationMap latitude={location.latitude} longitude={location.longitude} aproximate={aproximate} mapId={jobId}/>
            </div>
            <Link className={styles.title} href={"/posting/" + postingUrl}>
                {postingTitle}
            </Link> 
            <div className={styles.description}>
                {postingDescription}
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
            <button className={styles.contactButton} onClick={sendMessage}>
                Contactar
            </button>
        </div>
    )
}