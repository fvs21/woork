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
import { PHONE_NUMBER_TAKEN_ERROR } from "../../utils/authentication/ErrorResponses";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const day = new Date().getDate();
    const month = new Date().getMonth()+1;
    const year = new Date().getFullYear();
    const { setAuth } = useAuth();
    const router = useRouter();

    const [firstName, setFirstName] = useState({
        value: "",
        errorMsg: "",
    });
    const [lastName, setLastName] = useState({
        value: "",
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
        setErrorMsg(setFirstName, "");
        setErrorMsg(setLastName, "");
        setErrorMsg(setPhoneNumber, "");
        setErrorMsg(setDateOfBirth, "");
        setErrorMsg(setPassword, "");
    }

    const body = {
        "firstName": firstName.value,
        "lastName": lastName.value,
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
                <RegisterNameInput firstName={firstName.value} setFirstName={setFirstName} lastName={lastName.value} setLastName={setLastName} />
                <br/>
                <RegisterPhoneInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} errorMsg={phoneNumber.errorMsg} />
                <br/>
                <RegisterPasswordInput password={password} setPassword={setPassword} />
                <br/>
                <RegisterDateInput dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} />
                <br/>
                <div className={styles['registration-disclaimers']}>
                    <span>Debes tener más de 18 años para poder registrarte en woork.</span>
                    <br/><br/>
                    <span>Al hacer click en "Regístrate", aceptas nuestros Términos y Condiciones...</span>
                </div>
                <br/>
                <SubmitButton>Regístrate</SubmitButton>
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