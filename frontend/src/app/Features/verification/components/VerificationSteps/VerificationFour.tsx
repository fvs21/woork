import { useRouter } from 'next/navigation';
import styles from './Verification.module.scss';

export default function VerificationFour() {
    const router = useRouter();

    return (
        <section>
            <div className={styles.title} style={{marginBottom: "20px"}}>
                Siguientes pasos
            </div>
            <div className={styles.finalMessage}>
                Ya has subido todos los documentos requeridos. Ahora deberas esperar a que nuestro equipo verifique tu información.
            </div>
            <div className={styles.finalMessage}>
                Una vez tu cuenta haya sido verificada, te enviaremos un correo electrónico con la confirmación.
            </div>
            <div className={styles.continueBtn}>
                <button className={styles.startVerificationBtn} onClick={() => router.push('/dashboard')}>
                    Ir a cuenta
                </button>
            </div>
        </section>
    )
}