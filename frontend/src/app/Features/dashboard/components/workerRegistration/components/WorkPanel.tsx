import { useUser } from "@/api/hooks/user";
import styles from "./WorkPanel.module.scss";
import { lazy, Suspense, useEffect, useState } from "react";
import LoadingModal from "@/components/LoadingModal/LoadingModal";
import { determineSvgIconForRequirement } from "../utils/WorkerRegistrationUtils";
import { useRegisterWorker } from "@/api/hooks/worker";
import { flash } from "@/flash-message/flashMessageCreator";
import { useDashboardOption } from "@/features/dashboard/context";

const RegisterWorkerModal = lazy(() => import("./WorkerRegistration/RegisterWorkerModal"));

export default function WorkPanel() {
    const [user] = useUser();
    const [registerModal, setRegisterModal] = useState<boolean>(false);

    const { register, registerWorkerInvalid } = useRegisterWorker();
    const [,setOption] = useDashboardOption();

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {
            const request = await register();
            flash("Registro exitoso", 4000, "success");
        } catch(error) {
            flash(error.response.data.message, 4000, "error");
        }
    }

    //just for development
    const status = {
        information: 'verified',
        identification: 'none',
        criminalRecords: 'none'
    }

    function determineStylesForRequirement(status: string) {
        switch(status) {
            case 'none':
            case 'rejected':
                return styles.canSubmit;
            case 'pending':
            case 'verified':
                return styles.cannotSubmit;
        }
    }

    useEffect(() => {
        return;
        if(!user.is_worker) {
            setRegisterModal(true);
        }
    }, []);

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
                <div className={`${styles.requirement} ${determineStylesForRequirement(status.criminalRecords)}`}>
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