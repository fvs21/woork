import Link from "next/link";
import styles from "./UserDropdown.module.scss";
import UserSVG from "../SVGs/User";
import LogoutSVG from "../SVGs/Logout";
import MoonSVG from "../SVGs/Moon";
import { useState } from "react";
import { useTheme } from "@/hooks/theme";
import { useUser } from "@/api/hooks/user";
import MegaphoneSVG from "../SVGs/Megaphone";
import { useLogout } from "@/api/hooks/authentication";
import { useRouter } from "next/navigation";
import { flash } from "@/flash-message/flashMessageCreator";

export default function UserDropdown() {
    const [user] = useUser();
    
    function logoutUser(e) {
        e.preventDefault();

    }
    const [theme, switchTheme] = useTheme();
    const [dark, setDark] = useState(theme == 'dark' ? true : false);

    const color = theme == 'dark' ? 'white' : 'black';

    const logout = useLogout();
    const router = useRouter();

    async function logoutUser(e) {
        e.preventDefault();

        try {
            await logout();
            router.push("/login");
        } catch(error) {
            flash("Un error ha ocurrido", 4000, "error");
        }
    }

    return (
        <div className={styles.dropdownContent + " " + (theme == 'dark' ? styles.dropdownDark : styles.dropdownLight)}>
            {user.phoneVerified &&
                <>
                    <Link className={styles.dropdownItem + " " + styles.link} href="/dashboard" onMouseDown={(e) => e.preventDefault()}>
                        <UserSVG width={"25px"} color={color}/>
                        Cuenta
                    </Link>
                    <Link className={styles.dropdownItem + " " + styles.link} href="/jobs" onMouseDown={(e) => e.preventDefault()}>
                        <MegaphoneSVG width={"22px"} color={color}/>
                        Publicaciones
                    </Link>
                </>
            }
            <div 
                className={`${styles.dropdownItem} ${styles.darkModeContainer}`}
                onMouseDown={(e) => {
                    e.preventDefault()
                }}
                onClick={() => {
                    setDark(!dark);
                    switchTheme();
                }}>
                <MoonSVG width={"25px"} color={color}/>
                Modo oscuro
                <label 
                    className={styles.switch}
                    onClick={(e) => {
                        e.preventDefault(e);
                    }}>
                    <input 
                        checked={dark} 
                        className={styles.darkmodeInput} type="checkbox" onChange={() => {}}/>
                        
                    <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
            </div>
            <button
                onClick={logoutUser}
                className={styles.dropdownItem}
                onMouseDown={(e) => e.preventDefault()}
            >
                <LogoutSVG width={"25px"} color={color}/>
                Cerrar sesión
            </button>
        </div>
    );
}
