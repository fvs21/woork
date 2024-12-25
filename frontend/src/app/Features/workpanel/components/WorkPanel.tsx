import { useUser } from "@/api/hooks/user";
import styles from "./WorkPanel.module.scss";
import { lazy, Suspense, useEffect, useState } from "react";
import LoadingModal from "@/components/LoadingModal/LoadingModal";

const RegisterWorkerModal = lazy(() => import("./WorkerRegistration/RegisterWorkerModal"));

export default function WorkPanel() {
    const [user] = useUser();
    const [registerModal, setRegisterModal] = useState<boolean>(false);

    useEffect(() => {
        if(!user.is_worker) {
            setRegisterModal(true);
        }
    }, []);

    return (
        <div>
            <div className={styles.header}>
                Panel de trabajador
            </div>    
            <div>
                {user.is_worker ? 
                    ""
                :
                    "Registrate como trabajador para comenzar a trabajar."
                }
            </div>
            {registerModal &&
                <Suspense fallback={<LoadingModal />}>
                    <RegisterWorkerModal close={() => setRegisterModal(false)} />
                </Suspense>
            }
        </div>
    );
}