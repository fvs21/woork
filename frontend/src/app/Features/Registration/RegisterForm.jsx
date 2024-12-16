import { useState } from "react";
import styles from './Registration.module.scss';
import SubmitButton from "@/Components/SubmitButton/SubmitButton";
import RegisterNameInput from "./RegisterNameInput";
import RegisterDateInput from "./RegisterDateInput";
import RegisterPasswordInput from "./RegisterPasswordInput";
import RegisterPhoneInput from "./RegisterPhoneInput";
import { validateAge, validateRegisterBody } from "@/Services/validators";
import Link from "next/link";
import { stringifyDateOfBirth } from "@/Utils/authentication/RegisterUtils";
import Form from "@/Components/Form/Form";

export default function RegisterForm() {
    const day = new Date().getDate();
    const month = new Date().getMonth()+1;
    const year = new Date().getFullYear();

    const [fullName, setFullName] = useState({
        firstName: "",
        lastName: "",
    });
    
    const [phoneNumber, setPhoneNumber] = useState({
        countryCode: "",
        phone: "",
    });

    const [dateOfBirth, setDateOfBirth] = useState({
        month: month,
        year: year,
        day: day,
        error: false
    });

    const [password, setPassword] = useState({
        value: "",
    });

    const body = {
        "firstName": fullName.firstName,
        "lastName": fullName.lastName,
        "countryCode": phoneNumber.countryCode,
        "phone": phoneNumber.phone,
        "dateOfBirth": stringifyDateOfBirth(dateOfBirth.year, dateOfBirth.month, dateOfBirth.day),
        "password": password.value
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateAge(stringifyDateOfBirth(dateOfBirth.year, dateOfBirth.month-1, dateOfBirth.day))) {
            setDateOfBirth({
                ...dateOfBirth,
                error: true
            });
        }

        if(!validateRegisterBody(body)) {
            return;
        }
    };

    return (
        <Form className={styles.registerFormContainer} height={"636px"}>
            <div className={styles['register-form']}>
                <div className={styles['form-title']}>
                    Crea tu cuenta
                </div>
                <form onSubmit={handleSubmit} method="post">
                    <RegisterNameInput 
                        fullName={fullName}
                        setName={setFullName} />
                    <RegisterPhoneInput 
                        phoneNumber={phoneNumber} 
                        setPhoneNumber={setPhoneNumber} />
                    <RegisterPasswordInput 
                        password={password.value} 
                        setPassword={setPassword}/>
                    <RegisterDateInput 
                        dateOfBirth={dateOfBirth} 
                        setDateOfBirth={setDateOfBirth} 
                        label={true}/>
                    <div className={styles['registration-disclaimers']}>
                        <span>Debes tener más de 18 años para poder registrarte en Woork.</span>
                        <br/><br/>
                        <span>Al hacer click en &quot;Regístrate&quot;, aceptas nuestros 
                            <Link className={styles["disclaimer-links"]} href="#"> Términos y Condiciones</Link> y 
                            <Link className={styles['disclaimer-links']} href="#"> política de privacidad</Link>.</span>
                    </div>
                    <div className={styles['submit-button-container']}>
                        <SubmitButton 
                            active={true}>Regístrate
                        </SubmitButton>
                    </div>
                </form>
                <div className={styles['register-link']}>   
                    <span className={`${styles['buttom-links']}`}>
                        <Link href="/login">¿Ya tienes una cuenta?</Link>
                    </span>
                </div>
            </div>
        </Form>
    )
}