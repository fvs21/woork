import styles from './Navbar.module.scss'
import '../../assets/globals.scss'

export default function Navbar(props) {
    if(props.showButtons) {
        return (
            <header className={styles['main-nav-bar']}>
                <div className={styles.logo}>
                    <p><a className={styles.links} href='/'>Woork</a></p>
                </div>
                <nav>
                    <ul className={styles['nav-links']}>
                        <li><a className={styles['nav-bar-btn']}>About</a></li>
                        <li><a className={styles['nav-bar-btn']}>Test</a></li>
                    </ul>
                </nav>
                <div>
                    <a href='/login' className={styles['nav-bar-btn']}>Inicia Sesión</a>
                    <a href='/register'>
                        <button className={styles['profile-btn']}>Regístrate</button>
                    </a>
                </div>
                
                
            </header>
        )
    } else {
        return (
            <header className={styles['main-nav-bar']}>
                <div className={styles.logo}>
                    <p><a className={styles.links} href='/'>Woork</a></p>
                </div>
            </header>
        ) 
    }
    
}