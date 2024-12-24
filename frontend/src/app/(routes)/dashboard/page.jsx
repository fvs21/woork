"use client";

import ArrowBackSVG from '@/components/SVGs/ArrowBack';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from "./Dashboard.module.scss";
import Logotype from '@/components/Logotype/Logotype';
import AccountPanel from '@/features/accountpanel/AccountPanel';
import useWindowDimensions from '@/hooks/window';
import VerifyPanel from '@/features/verifypanel/VerifyPanel';
import { useUser } from '@/api/hooks/user';
import { useTheme } from '@/hooks/theme';
import LogotypeWhite from '@/components/Logotype/LogotypeWhite';
import { svgColor } from '@/utils/extra/utils';
import WorkPanel from '@/features/workpanel/components/WorkPanel';
import SecurityPanel from '@/features/security/SecurityPanel';
import { useLogout } from '@/api/hooks/authentication';
import { useRouter } from 'next/navigation';
import MutationButton from '@/components/MutationButton';

export default function Page() {
    const [user] = useUser();
    
    const [option, setOption] = useState(2);
    const [panel, setPanel] = useState(0); //0 is options menu, and 1 is panel
    const { width } = useWindowDimensions();

    const [leftContainerStyle, setLeftContainerStyle] = useState(styles['left-container']);
    const [rightContainerStyle, setRightContainerStyle] = useState(styles['right-container']);

    const [theme, switchTheme] = useTheme();
    const dark = theme == 'dark';

    const svgClr = svgColor();

    const router = useRouter();
    const {logout, logoutDisabled} = useLogout();

    useEffect(() => {
        function determineContainerStyles() {
            if(width <= 1100) {
                if(panel == 0) {
                    setOption(-1);
                    setLeftContainerStyle(`${styles['left-container']} ${styles['full-container']}`);
                    setRightContainerStyle(styles['hide-container']);
                } else {
                    setLeftContainerStyle(styles['hide-container']);
                    setRightContainerStyle(`${styles['right-container']} ${styles['full-container']}`);
                }
            } else {
                setLeftContainerStyle(`${styles['left-container']}`);
                setRightContainerStyle(`${styles['right-container']}`); 
            }
        }

        determineContainerStyles();
    }, [width, panel]);

    const userPfp = <img 
        className={styles['nav-bar-user-pfp']} 
        src={user?.pfp_url} 
        width={"150px"} />


    function determineIfClicked(clicked) {
        if(clicked && width > 1110) {
            return styles.clicked;
        }
    }

    async function logoutUser(e) {
        e.preventDefault();
        
        try {
            await logout();
        } catch(error) {
            console.log(error);
        }
    }

    function determineOptionPanel() {
        switch(option) {
            case 0:
            case -1:
                return <AccountPanel />
            case 1:
                return <VerifyPanel />
            case 2:
                return <WorkPanel />
            case 3:
                return <SecurityPanel />
        }
    }

    function changeOption(option) {
        setOption(option);
        setPanel(1);
    }

    return (
        <div className={styles['main-container']}>  
            <title>Woork - Cuenta</title>
            <div className={leftContainerStyle}>
                <ul className={styles['account-nav-bar']}>
                    <li className={styles['nav-bar-header']}>
                        <div className={styles['header-container']}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Link href="/explore">
                                    <ArrowBackSVG width={"20px"} color={theme == 'dark' ? 'white' : 'black'} />
                                </Link>
                            </div>
                            <div className={styles['logotype-header']}>
                                {theme == 'dark' ? 
                                    <LogotypeWhite width={"120px"} />
                                :
                                    <Logotype width={"120px"} />
                                }
                            </div> 
                    
                        </div>
                    </li>
                    {width <= 1100 && 
                        <>
                            <li className={styles['nav-bar-user-info']}>
                                {userPfp}
                                <br/><br/>
                                <div className={styles['nav-bar-user-name']}>{user?.firstName + " " + user?.lastName}</div>
                            </li>
                            <br/>
                        </>
                    }
                    <li>
                        <button className={`${styles['option-btn']} ${determineIfClicked(option==0)}`}
                            onClick={() => changeOption(0)}>Información</button>
                    </li>
                    <li>
                        <button className={`${styles['option-btn']} ${determineIfClicked(option==1)}`}
                            onClick={() => changeOption(1)}>Verificate</button>
                    </li>
                    <li>
                        <button className={`${styles['option-btn']}`}
                            onClick={() => router.push("/profile")}>Ir a mi perfil</button>
                    </li>
                    <li>
                        <button 
                            className={`${styles['option-btn']} ${determineIfClicked(option==2)}`}
                            onClick={() => changeOption(2)}>
                                Trabaja
                        </button>
                    </li>
                    <li>
                        <button className={`${styles['option-btn']} ${determineIfClicked(option==3)}`}
                            onClick={() => changeOption(3)}>Contraseña y seguridad</button>
                    </li>
                    <li>
                        <button className={`${styles['option-btn']} ${determineIfClicked(option==4)}`}
                            onClick={() => changeOption(4)}>Métodos de pago</button>
                    </li>
                    <li>
                        <button 
                            className={styles['option-btn'] + " " + styles.themeToggleContainer}
                            onClick={() => {
                                switchTheme();
                        }}>
                            Modo oscuro
                            <label 
                                className={styles.switch}
                                onClick={(e) => {
                                    e.preventDefault(e);
                                }}
                            >
                                <input 
                                    checked={dark} 
                                    className={styles.darkmodeInput} 
                                    type="checkbox"
                                    onChange={() => {}}
                                />
                                <span className={`${styles.slider} ${styles.round}`}></span>
                            </label>
                        </button>
                    </li>
                    <li>
                        <MutationButton click={logoutUser} className={styles['option-btn']} disabled={logoutDisabled}>
                            Cerrar sesión
                        </MutationButton>
                    </li>
                </ul>
            </div>
            <div className={rightContainerStyle}>
                {width <= 1100 && 
                    <>
                        <button className={styles['return-to-options-btn']} onClick={() => {setPanel(0); setOption(-1)}}>
                            <ArrowBackSVG width={"25px"} color={svgClr}/>
                        </button>
                    </>
                }
                {determineOptionPanel()}
            </div>
        </div>
    )
}
