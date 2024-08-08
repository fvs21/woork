import styles from './Navbar.module.scss';
import '../../assets/globals.scss';
import Logotype from "../Logotype/Logotype";
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

export default function Navbar(props) {
    const { auth } = useAuth();

    function AuthenticationButtons() {
        if(auth.loggedIn) {
            return (
                <Link href='/account'>
                   <button className={styles['profile-btn']}>Cuenta</button>
                </Link>
            )
        } else {
            return (
                <>
                    <Link href='/login' className={styles['nav-bar-btn']}>Inicia Sesión</Link>
                    <Link href='/register'>
                        <button className={styles['profile-btn']}>Regístrate</button>
                    </Link>
                </>
            )
        }
    }

    if(props.showButtons) {
        return (
            <header className={styles['main-nav-bar']}>
                <div className={styles.logo}>
                    <Logotype width={"100px"} />
                </div>
                <nav className={styles['nav-links-container']}>
                    <ul className={styles['nav-links']}>
                        <li><a className={styles['nav-bar-btn']}>Nosotros</a></li>
                        <li><a className={styles['nav-bar-btn']}>Qué ofrecemos?</a></li>
                    </ul>
                </nav>
                <div>
                    <AuthenticationButtons />
                </div>
            </header>
        )
    } else {
        return (
            <header className={styles['main-nav-bar']}>
                <div className={styles.logo}>
                    <Logotype width={"100px"} />
                </div>
                <nav className={`${styles['nav-links-container']} ${styles['page-loading']}`}>
                    <ul className={styles['nav-links']}>
                        <li><a className={styles['nav-bar-btn']}>About</a></li>
                        <li><a className={styles['nav-bar-btn']}>Test</a></li>
                    </ul>
                </nav>
                <div className={styles['page-loading']}>
                    <AuthenticationButtons />
                </div>
            </header>
        )
    }

}
