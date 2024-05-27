'use client'

import Form from "../../components/form/Form"
import styles from './AuthForms.module.scss'

export default function LoginForm() {
    function handleSubmit(event) {
        console.log(event.target)
    }

    return (
        <Form>
            <h2>Inicia sesión</h2>
            <form onSubmit={handleSubmit} method="post">
                <label className={styles["input-label"]}>Correo electrónico o número</label>
                <div className={styles["input-container"]}>
                    <input name="email" type="email" placeholder="Ingresa tu teléfono o correo electrónico" className={styles["form-input"]} required/>
                </div>
                <br/>
                <label className={styles["input-label"]}>Contraseña</label>
                <div className={styles["input-container"]}>
                    <input name="password" type="password" placeholder="Constraseña" className={styles["form-input"]} required/>
                </div>
                <br/>
                <div className={styles["input-container"]}>
                    <button type="sumbit" className={`${styles['form-input']} ${styles['submit-btn']}`}>Iniciar sesión</button>
                </div>
            </form>
        </Form>
    )
}