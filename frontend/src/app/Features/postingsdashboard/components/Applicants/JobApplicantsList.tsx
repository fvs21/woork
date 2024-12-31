import Modal from "@/components/Modal/Modal";
import styles from "./Applicants.module.scss";
import CloseSVG from "@/components/SVGs/Close";
import { svgColor } from "@/utils/extra/utils";
import Applicant from "./Applicant";
import LoadingModal from "@/components/LoadingModal/LoadingModal";
import { useFetchPostingApplicants } from "@/api/hooks/postings";
import { useAcceptApplicant } from "@/api/hooks/jobapplications";
import { useRouter } from "next/navigation";
import { flash } from "@/flash-message/flashMessageCreator";

type JobApplicantsListProps = {
    closeModal: () => void;
    postingUrl: string;
}

export default function JobApplicantsList({closeModal, postingUrl}: JobApplicantsListProps) {
    const svgClr = svgColor();

    const { data, isLoading } = useFetchPostingApplicants(postingUrl);

    const { accept, acceptApplicantInvalid } = useAcceptApplicant();
    const router = useRouter();

    async function handleAccept(applicantId: number) {
        try {
            await accept({
                applicantId: applicantId,
                postingId: postingUrl
            });
            router.push("/jobs");
        } catch(error) {
            flash(error.response.data.message, 4000, "error");
        }
    }

    if(isLoading)
        return <LoadingModal />

    return (
        <Modal className={styles.jobApplicantsModal} handleClose={closeModal}>
            <header className={styles.jobApplicantsHeader}>
                <button className={styles.closeModalBtn} onClick={closeModal}>
                    <CloseSVG width={"20px"} color={svgClr} />
                </button>
                Lista de aplicantes
            </header>
            <div className={styles.applicantsList}>
                {data.length != 0 ?
                    data?.map(function(worker, i) {
                        return <Applicant 
                            key={i}
                            id={worker.id}
                            pfpUrl={worker.pfpUrl}
                            name={worker.name}
                            username={worker.username}
                            rating={worker.rating}
                            accept={handleAccept}
                            acceptInvalid={acceptApplicantInvalid}
                        />
                    })
                :
                    <div className={styles.noApplicants}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                        </svg>
                        No has recibido ninguna solicitud.
                    </div>
                }
            </div>
        </Modal>
    )
}