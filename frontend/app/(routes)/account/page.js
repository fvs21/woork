'use client';

import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { useState } from "react";
import styles from "./Account.module.scss";
import { determineOptionPanel } from "../../utils/Account/AccountUtils";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useFetchUser } from "../../hooks/authentication";

export default function AccountPage() {
    const [option, setOption] = useState(0);

    const {isLoading} = useFetchUser();

    function determineIfClicked(clicked) {
        if(clicked) {
            return styles['clicked']
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
                                <a href="/">
                                    <button className={styles['nav-bar-header-btn']}>
                                        <i className="fa fa-arrow-left fa-1" aria-hidden="true"></i>
                                    </button>
                                </a>
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
                            <button className={`${styles['option-btn']}`}>Cerrar sesión</button>
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