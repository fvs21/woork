import Link from "next/link";
import styles from "./VerifyPanel.module.scss";

export default function VerifyPanel() {
    return (
        <div>
            <h1>Verifica tu identidad</h1>
            <div className={styles.description}>
                Verificarte ayuda a mejorar la seguridad la comunidad y asegurar que tu realmente seas el dueño la cuenta.<br/>
                Este proceso no es obligatorio para todos pero es recomendado como medida preventiva de seguridad.<br/>
            </div>
            <div className={styles.description}>
                Si deseas registrarte en Woork para<i> trabajar</i>, este proceso de verificación es <b>obligatorio</b>.
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
            <Link href={"#"} className={styles['disclaimer-link']}>
                ¿Para qué necesitamos esto?
            </Link>
        </div>
    )
}