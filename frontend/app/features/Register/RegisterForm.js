'use client';

import { useState } from "react";
import styles from './RegisterForm.module.scss'
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useAuth } from "../../hooks/useAuth";
import { useRegisterUser } from "../../hooks/authentication";
import Link from "next/link";
import { stringifyDateOfBirth } from "../../utils/authentication/RegisterUtils";
import RegisterNameInput from "./RegisterNameInput";
import RegisterDateInput from "./RegisterDateInput";
import RegisterPasswordInput from "./RegisterPasswordInput";
import RegisterPhoneInput from "./RegisterPhoneInput";
import { validateRegisterBody } from "../../services/Validators";
import { FIRSTNAME_NULL_ERROR, INVALID_PHONE_NUMBER_ERROR, LASTNAME_NULL_ERROR, PASSWORD_ERROR, PHONE_LENGTH_ERROR, PHONE_NUMBER_TAKEN_ERROR } from "../../utils/authentication/RegistrationErrorResponses";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const day = new Date().getDate();
    const month = new Date().getMonth()+1;
    const year = new Date().getFullYear();
    const { setAuth } = useAuth();
    const router = useRouter(); 

    const [fullName, setFullName] = useState({
        firstName: "",
        lastName: "",
        errorMsg: "",
    });
    
    const [phoneNumber, setPhoneNumber] = useState({
        countryCode: "",
        phone: "",
        errorMsg: "",
    });
    const [dateOfBirth, setDateOfBirth] = useState({
        month: month,
        year: year,
        day: day,
        errorMsg: ""
    });
    const [password, setPassword] = useState({
        value: "",
        errorMsg: "",
    });

    function setErrorMsg(setter, error) {
        setter(prevState => ({
            ...prevState,
            errorMsg: error
        }));
    }

    function resetErrors() {
        setErrorMsg(setFullName, "");
        setErrorMsg(setPhoneNumber, "");
        setErrorMsg(setDateOfBirth, "");
        setErrorMsg(setPassword, "");
    }

    const body = {
        "firstName": fullName.firstName,
        "lastName": fullName.lastName,
        "countryCode": phoneNumber.countryCode,
        "phone": phoneNumber.phone,
        "dateOfBirth": stringifyDateOfBirth(dateOfBirth.year, dateOfBirth.month-1, dateOfBirth.day),
        "password": password.value
    }

    const { registerUserFn } = useRegisterUser(body);

    async function handleSubmit(e) {
        e.preventDefault();
        if(!validateRegisterBody(body)) {
            return;
        }

        try {
            resetErrors();
            const request = await registerUserFn();
            setAuth({
                "access_token": request.data.access_token,
                "loggedIn": true
            });
            router.push("/register/verify");
        } catch (error) { 
            const response = error.response.data;

            switch(response) {
                case PHONE_NUMBER_TAKEN_ERROR:
                    setErrorMsg(setPhoneNumber, "Número de teléfono ya en uso.");
                    break;
                case INVALID_PHONE_NUMBER_ERROR, PHONE_LENGTH_ERROR:
                    setErrorMsg(setPhoneNumber, "Número de teléfono inválido.");
                    break;
                case INVALID_PHONE_NUMBER_ERROR:
                    setErrorMsg(setDateOfBirth, "No cumples con el requisito de edad para poder registrate.")
                    break;
                case FIRSTNAME_NULL_ERROR, LASTNAME_NULL_ERROR:
                    setErrorMsg(setFullName, "Debe colocar un nombre");
                    break;
                case PASSWORD_ERROR:
                    setErrorMsg(setPassword, "La contraseña debe tener al menos 8 caracteres y máximo 16");
                    break;
            }
        }
    }

    return (
        <>
            <div className={styles['form-title']}>
                <h2>Regístrate</h2>
            </div>
            <hr className={styles["hr-style"]}/>
            <br/>
            <form onSubmit={handleSubmit} method="post">
                <RegisterNameInput firstName={fullName.firstName} lastName={fullName.lastName} setFullName={setFullName} errorMsg={fullName.errorMsg} />
                <br/>
                <RegisterPhoneInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} errorMsg={phoneNumber.errorMsg} />
                <br/>
                <RegisterPasswordInput password={password} setPassword={setPassword} errorMsg={password.errorMsg}/>
                <br/>
                <RegisterDateInput dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} errorMsg={dateOfBirth.errorMsg} />
                <br/>
                <div className={styles['registration-disclaimers']}>
                    <span>Debes tener más de 18 años para poder registrarte en Woork.</span>
                    <br/><br/>
                    <span>Al hacer click en &quot;Regístrate&quot;, aceptas nuestros Términos y Condiciones...</span>
                </div>
                <br/>
                <SubmitButton active={true}>Regístrate</SubmitButton>
            </form>
            <br/>
            <div className={styles['div-center']}>   
                <span className={`${styles['buttom-links']}`}>
                    <Link href="/login">Ya tienes una cuenta?</Link>
                </span>
            </div>
        </>
    )
}