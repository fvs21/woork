"use client";

import ArrowBackSVG from '@/components/SVGs/ArrowBack';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from "./Dashboard.module.scss";
import Logotype from '@/components/Logotype/Logotype';
import useWindowDimensions from '@/hooks/window';
import { useUser } from '@/api/hooks/user';
import { useTheme } from '@/hooks/theme';
import LogotypeWhite from '@/components/Logotype/LogotypeWhite';
import { svgColor } from '@/utils/extra/utils';
import { useLogout } from '@/api/hooks/authentication';
import { useRouter } from 'next/navigation';
import MutationButton from '@/components/MutationButton';
import { useDashboardOption } from '../../context';
import { determineOptionPanel } from '../../utils';

export default function Dashboard() {
    const [user] = useUser();
    
    const [option, setOption] = useDashboardOption();
    const [panel, setPanel] = useState<number>(0); //0 is options menu, and 1 is panel
    const { width } = useWindowDimensions();

    const [leftContainerStyle, setLeftContainerStyle] = useState(styles['left-container']);
    const [rightContainerStyle, setRightContainerStyle] = useState(styles['right-container']);

    const [theme, switchTheme] = useTheme();
    const dark: boolean = theme == 'dark';

    const svgClr = svgColor();

    const router = useRouter();
    const { logout, logoutDisabled } = useLogout();

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
                    {!user.is_worker &&
                        <li>
                            <button 
                                className={`${styles['option-btn']} ${determineIfClicked(option==2)}`}
                                onClick={() => changeOption(2)}>
                                    Regístrate como trabajador
                            </button>
                        </li>
                    }
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
                                    e.preventDefault();
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
                        <MutationButton click={logoutUser} classname={styles['option-btn']} disable={logoutDisabled}>
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
                {determineOptionPanel(option)}
            </div>
        </div>
    )
}
