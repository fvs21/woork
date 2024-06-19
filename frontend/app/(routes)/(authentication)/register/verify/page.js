import PhoneVerification from "../../../../features/PhoneVerification/PhoneVerification";
import styles from "../Register.module.scss";
import Form from "../../../../components/Form/Form";
import Logotype from "../../../../components/Logotype/Logotype"

export default function VerificationPage() {
    return (
        <div className={`${styles['register-form']} bg-gray`}>
            <div className={styles['logotype-container']}>
                <Logotype width={"200px"} />
            </div>
            <Form>
                <PhoneVerification />    
            </Form> 
        </div>
    )
}