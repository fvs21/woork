import LoginForm from "../../../features/Login/LoginForm"
import Navbar from "../../../components/navbar/NavBar"
import styles from './Login.module.scss'
import Form from "../../../components/Form/Form"
import Logotype from "../../../components/Logotype/Logotype"

export default function LoginPage() {
    return (
        <div className={`${styles['login-form']} bg-gray`}>
            <div className={styles['logotype-container']}>
                <Logotype width={"200px"} />
            </div>
            <Form>
                <LoginForm />
            </Form>
        </div>
    )
}