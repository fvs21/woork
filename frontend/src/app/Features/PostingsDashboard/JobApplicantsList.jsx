import Modal from "@/components/Modal/Modal";
import styles from "./PostingsDashboard.module.scss";
import CloseSVG from "@/components/SVGs/Close";
import { svgColor } from "@/utils/extra/utils";
import Applicant from "./Applicant";
import { useQuery } from "react-query";
import axios from "@/api/axios";
import LoadingModal from "@/components/LoadingModal/LoadingModal";
import { useFetchPostingApplicants } from "@/api/hooks/postings";

export default function JobApplicantsList({closeModal, postingUrl}) {
    const svgClr = svgColor();

    const { data, isLoading } = useFetchPostingApplicants(postingUrl);

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
                            pfpUrl={worker.pfpUrl}
                            name={worker.name}
                            username={worker.username}
                            rating={worker.rating}
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