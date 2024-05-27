import LoginForm from '../../../features/authentication/LoginForm'
import Navbar from "../../../components/navbar/NavBar"
import styles from './Login.module.scss'

export default function LoginPage() {
    return (
        <>
            <Navbar showButtons={false} />
            <div className={styles['login-form']}>
                <LoginForm />
            </div>
        </>
    )
}