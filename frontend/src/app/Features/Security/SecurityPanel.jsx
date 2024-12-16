import ArrowRightSVG from "@/Components/SVGs/ArrowRight";
import styles from "./SecurityPanel.module.scss";
import { svgColor } from "@/Utils/extra/utils";
import LockSVG from "@/Components/SVGs/Lock";
import SecuritySVG from "@/Components/SVGs/Security";
import { lazy } from "react";
import { useState } from "react";
import { Suspense } from "react";
import LoadingModal from "@/Components/LoadingModal/LoadingModal";

const ChangePasswordModal = lazy(() => import("./ChangePasswordModal"));

export default function SecurityPanel() {
    const [displayChangePasswordModal, setDisplayChangePasswordModal] = useState(false);

    return (
        <div className="global-container">
            <div className={styles.title}>
                Constraseña y seguridad
            </div>
            <div className={styles.passwordContainer}>
                <div className={styles.subTitle}>
                    Inicio de sesión
                </div>
                <div className={styles.securityOptions}>
                    <button className={styles.option} onClick={() => setDisplayChangePasswordModal(true)}>
                        <div style={{display: "flex", gap: "10px"}}>
                            <LockSVG width={"18px"} color={svgColor()}/>
                            Cambiar contraseña
                        </div>
                        <div className={styles.arrow}>
                            <ArrowRightSVG width={"18px"} color={svgColor()}/>
                        </div>
                    </button>
                    <button className={styles.option}>
                        <div style={{display: "flex", gap: "10px"}}>
                            <SecuritySVG width={"18px"} color={svgColor()}/>
                            Activar autentificación de 2 pasos
                        </div>
                        <div className={styles.arrow}>
                            <ArrowRightSVG width={"18px"} color={svgColor()}/>
                        </div>
                    </button>
                </div>
            </div>
            {displayChangePasswordModal &&
                <Suspense fallback={<LoadingModal />}>
                    <ChangePasswordModal closeModal={() => setDisplayChangePasswordModal(false)}/>
                </Suspense>
            }
        </div>
    )
}