import Logotype from "@/Components/Logotype/Logotype";
import { Head } from "@inertiajs/react";
import styles from "./Landing.module.scss";
import Form from "@/Components/Form/Form";
import ValidatedInput from "@/Components/ValidatedInput/ValidatedInput";

export default function LandingMobile() {
    return (
        <div className="global-container">
            <Head title="Inicio" />
            <div className={styles['logotype-container']}>
                <Logotype width={"50%"} />
            </div>
            <div className={styles['login-form']}>
                <form>
                    <ValidatedInput valid={true} placeholder={"Correo electrónico"} />
                    <br/>
                    <ValidatedInput valid={true} placeholder={"Contraseña"} />
                </form>
            </div>
        </div>
    )
}