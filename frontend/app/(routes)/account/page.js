'use client';

import { useState } from "react";
import styles from "./Account.module.scss";
import { determineOptionPanel } from "../../utils/account/AccountUtils";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useFetchUser, useLogoutUser } from "../../hooks/authentication";
import Link from "next/link";
import ArrowBackSVG from "../../components/SVGs/ArrowBack";

export default function AccountPage() {
    const [option, setOption] = useState(0);
    const { isLoading } = useFetchUser();

    const { logoutFn } = useLogoutUser();

    function determineIfClicked(clicked) {
        if(clicked) {
            return styles['clicked']
        }
    }

    async function logoutUser(event) {
        event.preventDefault();

        try {
            logoutFn();
            window.location.replace("/");

        } catch(error) {
            console.log(error);
        }
    }

    if(isLoading) {
        return (
            <LoadingScreen />
        )
    }
    return (
        <>  
            <div className={styles['main-container']}>
                <div className={styles['left-container']}>
                    <ul className={styles['account-nav-bar']}>
                        <li className={styles['nav-bar-header']}>
                            <div className={styles['header-container']}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Link href="/">
                                        <ArrowBackSVG width={"15px"} />
                                    </Link>
                                </div>
                                <h2>Configuración</h2>
                            </div>
                        </li>
                        <li>
                            <button className={`${styles['option-btn']} ${determineIfClicked(option==0)}`}
                                onClick={() => setOption(0)}>Información</button>
                        </li>
                        <li>
                            <button className={`${styles['option-btn']} ${determineIfClicked(option==1)}`}
                                onClick={() => setOption(1)}>Contraseña y seguridad</button>
                        </li>
                        <li>
                            <button className={`${styles['option-btn']} ${determineIfClicked(option==2)}`}
                                onClick={() => setOption(2)}>Métodos de pago</button>
                        </li>
                        <li>
                            <button onClick={logoutUser} className={`${styles['option-btn']}`}>Cerrar sesión</button>
                        </li>
                    </ul>
                </div>
                <div className={styles['right-container']}>
                    {determineOptionPanel(option)}
                </div>
            </div>
        </>
    )
}