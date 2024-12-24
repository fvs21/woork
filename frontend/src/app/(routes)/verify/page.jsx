import styles from "./Verify.module.scss";
import Logotype from "@/components/Logotype/Logotype";
import Layout from "@/components/Layout/Layout";
import Link from "next/link";

export const metadata = {
    title: 'Verifica tu identidad'
}

export default function Verify() {
    return (
        <Layout>
            <main className={styles['main-container']}>
                <div className={styles['content-container']}>
                    <div style={{marginBottom: "20px"}}>
                        <Logotype width={"250px"} />
                        <div className={styles.title}>Verifíca tu identidad para utilizar Woork</div>
                    </div>
                    <div className={styles.requirements}>
                        <h3>Necesitaras:</h3>
                        <ol className={styles.steps}>
                            <li>Una foto de una identificación oficial, ya sea licencia de conducir o credencial para votar</li>
                            <li>Una foto de tu cara.</li>
                        </ol>
                        <Link href={"#"} className={styles['information-disclaimer']}>¿Cómo utilizamos esta información?</Link>
                    </div>
                    <div>
                        <button className={styles['start-verification-btn']}>Comienza con la verificación</button>
                    </div>
                </div>
            </main>
        </Layout>
    )
}