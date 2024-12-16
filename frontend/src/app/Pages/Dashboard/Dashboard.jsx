import ArrowBackSVG from '@/Components/SVGs/ArrowBack';
import { Head, Link, router} from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import styles from "./Dashboard.module.scss";
import Logotype from '@/Components/Logotype/Logotype';
import AccountPanel from '@/Features/AccountPanel/AccountPanel';
import useWindowDimensions from '@/Hooks/window';
import VerifyPanel from '@/Features/VerifyPanel/VerifyPanel';
import { useUser } from '@/jotai/user';
import { useTheme } from '@/Hooks/theme';
import LogotypeWhite from '@/Components/Logotype/LogotypeWhite';
import { svgColor } from '@/Utils/extra/utils';
import WorkPanel from '@/Features/WorkPanel/WorkPanel';
import SecurityPanel from '@/Features/Security/SecurityPanel';

export default function Dashboard({ flash: f }) {
    const [option, setOption] = useState(-1);
    const [user] = useUser();
    const [panel, setPanel] = useState(0); //0 is options menu, and 1 is panel
    const {width} = useWindowDimensions();

    const [leftContainerStyle, setLeftContainerStyle] = useState(styles['left-container']);
    const [rightContainerStyle, setRightContainerStyle] = useState(styles['right-container']);

    const [theme, switchTheme] = useTheme();
    const [dark, setDark] = useState(theme == 'dark');

    const svgClr = svgColor();

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

    function logoutUser(e) {
        e.preventDefault();
        router.post('/logout');
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
        <Head title='Cuenta'/>
            <div className={leftContainerStyle}>
                <ul className={styles['account-nav-bar']}>
                    <li className={styles['nav-bar-header']}>
                        <div className={styles['header-container']}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Link href="/">
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
                                <div className={styles['nav-bar-user-name']}>{user.firstName + " " + user.lastName}</div>
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
                            onClick={() => router.visit("/profile")}>Ir a mi perfil</button>
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
                                setDark(!dark);
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
                                    onChange={() => {}}/>
                                <span className={`${styles.slider} ${styles.round}`}></span>
                            </label>
                        </button>
                    </li>
                    <li>
                        <button onClick={logoutUser} className={`${styles['option-btn']}`}>Cerrar sesión</button>
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
