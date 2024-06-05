import LoginForm from "../../../features/Login/LoginForm"
import Navbar from "../../../components/navbar/NavBar"
import styles from './Login.module.scss'
import Form from "../../../components/Form/Form"

export default function LoginPage() {
    return (
        <>
            <Navbar showButtons={false} />
            <div className={styles['login-form']}>
                <Form>
                    <LoginForm />
                </Form>
            </div>
        </>
    )
}