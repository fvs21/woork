import { Link, usePage } from "@inertiajs/react";
import Logotype from "../Logotype/Logotype";
import styles from "./Layout.module.scss";
import { useUser } from "@/jotai/user";
import { useState } from "react";
import UserDropdown from "../UserDropdown/UserDropdown";

export default function Layout({children}) {
    const { canLogin } = usePage().props.auth;
    const [user] = useUser();
    
    const [accountDropdown, setAccountDropdown] = useState(false);

    return (
        <main style={{height: "100%"}}>
            <div className={styles.layoutContainer}>
                <Link href="/explore" className={styles.logotype}>
                    <Logotype width={"100px"} />
                </Link>
                <div>
                    {!canLogin ? 
                        <div className={styles.accountBtnContainer}>
                            <div className={styles.userName}>
                                {user?.firstName}
                            </div>
                            <div 
                                className={styles.dropdownContainer}
                                onBlur={() => {setAccountDropdown(false)}}>
                                <button 
                                    tabIndex={0}
                                    className={styles.accountBtn}
                                    onMouseDown={(e) => {
                                        if(e.buttons === 1 || e.buttons === 0) {
                                            setAccountDropdown(!accountDropdown);
                                        }
                                    }}>
                                    <img 
                                        className={styles.pfp} 
                                        src={user?.pfp_url || '/images/default-pfp'} 
                                        alt="Foto de perfil"/>
                                </button>
                                {accountDropdown && 
                                    <UserDropdown />
                                }
                            </div>
                        </div>
                    :
                        <Link href="/login" className={styles.loginLink}>Inicia sesión</Link>
                    }
                </div>
            </div>
            {children}
        </main>
    )
}