"use client";

import styles from "./Footer.module.scss";
import { useTheme } from "@/Hooks/theme";

export default function Footer() {
    const [theme] = useTheme();

    const style = `${styles['content']} ${theme == 'dark' ? styles['color-dark'] : styles['color-light']}`;
    return (
        <footer className={styles['footer']}>
            <div className={styles['footer-content-container']}>
                <a className={style} href="#">
                    Términos y condiciones
                </a>
                <a className={style} href="#">
                    Política de privacidad
                </a>
            </div>
            <div>
                <span className={styles['company-tag']}>Woork © 2024</span>
            </div>
        </footer>
    )
}