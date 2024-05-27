import RegisterForm from "../../../features/authentication/RegisterForm"
import Navbar from "../../../components/navbar/NavBar"
import styles from './Register.module.scss'

export default function RegisterPage() {
    return (
        <>
            <Navbar showButtons={false} />
            <div className={styles['register-form']}>
                <RegisterForm/>   
            </div>
        </>
    )
}