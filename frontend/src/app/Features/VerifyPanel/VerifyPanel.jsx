import { Link } from "@inertiajs/react";
import styles from "./VerifyPanel.module.scss";

export default function VerifyPanel() {
    return (
        <div>
            <h1>Verifica tu identidad para poder usar Woork</h1>
            <div style={{fontSize: "large", paddingBottom: "10px"}}>
                Es importante verificar tus datos e identidad para que puedas utilizar Woork.
            </div>
            <h3>¿Cómo verificarte?</h3>
            <div style={{fontWeight: "500"}}>Para verificarte solo debes realizar 2 pasos:</div>
            <div style={{paddingBottom: "20px"}}>
                <ol className={styles['step-list']}>
                    <li>Subir una foto de alguna forma de verificación oficial.</li>
                    <li>Subir una foto de tu cara.</li>
                </ol>
            </div>
            <div style={{marginBottom: "30px"}}>
                <a href="/verify" target="_blank" className={styles['verify-link']}>
                    Verificate
                </a>
            </div>
            <Link className={styles['disclaimer-link']}>
                ¿Para qué necesitamos esto?
            </Link>
        </div>
    )
}