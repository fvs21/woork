import { useUser } from "@/api/hooks/user";
import styles from "./WorkPanel.module.scss";
import { lazy, Suspense, useEffect, useState } from "react";
import LoadingModal from "@/components/LoadingModal/LoadingModal";
import { determineSvgIconForRequirement } from "../utils/WorkerRegistrationUtils";
import { useDashboardOption } from "@/features/dashboard/context";
import { useWorkerRegistrationStatus } from "../api";
import { useRouter } from "next/navigation";

const RegisterWorkerModal = lazy(() => import("./WorkerRegistration/RegisterWorkerModal"));

export default function WorkPanel() {
    const [user] = useUser();
    const [registerModal, setRegisterModal] = useState<boolean>(false);
    const router = useRouter();

    const [,setOption] = useDashboardOption();

    const { data, isLoading } = useWorkerRegistrationStatus();

    function determineStylesForRequirement(status: string) {
        switch(status) {
            case 'NOT_SUBMITTED':
            case 'FAILED':
                return styles.canSubmit;
            case 'SUBMITTED':
            case 'APPROVED':
                return styles.cannotSubmit;
        }
    }

    if(isLoading)
        return <></>;

    const identificationStatus = (() => {
        if(data.userVerificationStatus.facePhotoStatus == "NOT_SUBMITTED" && data.userVerificationStatus.idPhotosStatus == "NOT_SUBMITTED")
            return "NOT_SUBMITTED";
        if(data.userVerificationStatus.facePhotoStatus == "SUBMITTED" || data.userVerificationStatus.idPhotosStatus == "SUBMITTED")
            return "SUBMITTED";
        if(data.userVerificationStatus.facePhotoStatus == "FAILED" || data.userVerificationStatus.idPhotosStatus == "FAILED")
            return "FAILED";
        if(data.userVerificationStatus.facePhotoStatus == "APPROVED" && data.userVerificationStatus.idPhotosStatus == "APPROVED")
            return "APPROVED";

        return "NOT_SUBMITTED";
    })();

    const status = {
        information: 'verified',
        identification: identificationStatus,
        criminalRecords: data.criminalRecordsVerificationStatus
    }

    return (
        <div>
            <div className={styles.header}>
                Bienvenido, {user.firstName}
            </div>    
            <div className={styles.description}>
                Para registrarte como trabajador, deberas subir los siguientes documentos:
            </div>
            <div className={styles.workerRegistrationRequirementsContainer}>
                <div className={`${styles.requirement} ${determineStylesForRequirement(status.information)}`}>
                    <span>
                        Completa tu información
                    </span>
                    {determineSvgIconForRequirement(status.information)}
                </div>
                <div className={`${styles.requirement} ${determineStylesForRequirement(status.identification)}`} onClick={() => setOption(1)}>
                    <span>
                        Verificación de identidad con identificación: INE o IFE
                    </span>
                    {determineSvgIconForRequirement(status.identification)}
                </div>
                <div className={`${styles.requirement} ${determineStylesForRequirement(status.criminalRecords)}`} onClick={() => router.push("/worker-registration")}> 
                    <span>
                        Carta de antecedentes no penales
                    </span>
                    {determineSvgIconForRequirement(status.criminalRecords)}
                </div>
            </div>
            {registerModal &&
                <Suspense fallback={<LoadingModal />}>
                    <RegisterWorkerModal close={() => setRegisterModal(false)} />
                </Suspense>
            }
        </div>
    );
}