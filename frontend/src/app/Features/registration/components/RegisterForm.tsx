"use client";

import { useState } from "react";
import styles from './Registration.module.scss';
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import RegisterNameInput from "./RegisterNameInput";
import RegisterDateInput from "./RegisterDateInput";
import RegisterPasswordInput from "./RegisterPasswordInput";
import RegisterPhoneInput from "./RegisterPhoneInput";
import { validateAge, validateRegisterBody } from "@/services/validators";
import Link from "next/link";
import { stringifyDateOfBirth } from "@/utils/authentication/RegisterUtils";
import Form from "@/components/Form/Form";
import { useRegister } from "@/api/hooks/authentication";
import { useRouter } from "next/navigation";
import LoadingSpinnerClear from "@/components/LoadingSpinnerClear";
import { useDobError, useNamesError, usePasswordError, usePhoneNumberError } from "../store";
import { DateOfBirth, Fullname, PhoneNumber, RegistrationBody } from "../types";
import Logotype from "@/components/Logotype/Logotype";

export default function RegisterForm() {
    const day = new Date().getDate();
    const month = new Date().getMonth()+1;
    const year = new Date().getFullYear();

    const [fullName, setFullName] = useState<Fullname>({
        firstName: "",
        lastName: "",
    });
    const [, setNamesError] = useNamesError();
    
    const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>({
        countryCode: "52",
        phone: "",
    });
    const [, setPhoneNumberError] = usePhoneNumberError();

    const [dateOfBirth, setDateOfBirth] = useState<DateOfBirth>({
        month: month,
        year: year,
        day: day,
    });
    const [, setDobError] = useDobError();

    const [password, setPassword] = useState<string>("");
    const [, setPasswordError] = usePasswordError();

    const { register, isLoading, registerDisabled } = useRegister();
    const router = useRouter();

    const body: RegistrationBody = {
        "firstName": fullName.firstName,
        "lastName": fullName.lastName,
        "countryCode": phoneNumber.countryCode,
        "phone": phoneNumber.phone,
        "dateOfBirth": stringifyDateOfBirth(dateOfBirth.year, dateOfBirth.month, dateOfBirth.day),
        "password": password
    }

    const clearErrors = () => {
        setDobError("");
        setNamesError("");
        setPasswordError("");
        setPhoneNumberError("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();

        if(!validateAge(stringifyDateOfBirth(dateOfBirth.year, dateOfBirth.month-1, dateOfBirth.day))) {
            setDobError("No cumples con el requisito de edad para poder registrarte.");
        }

        if(!validateRegisterBody(body)) {
            return;
        }

        try {
            await register(body);
            router.push("/verify-phone");
        } catch(error) {
            const data = error.response.data;

            setPhoneNumberError(data.message);
        }
    };

    return (
        <Form className={styles.registerFormContainer}>
            <div>
                <div className={styles['form-title']}>
                    <div className={styles.formLogotype}>
                        <Logotype width="150px" />
                    </div>
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
                        password={password} 
                        setPassword={setPassword}/>
                    <RegisterDateInput 
                        dateOfBirth={dateOfBirth} 
                        setDateOfBirth={setDateOfBirth} 
                        label={true} />
                    <div className={styles['registration-disclaimers']}>
                        <span>Debes tener más de 18 años para poder registrarte en Woork.</span>
                        <br/><br/>
                        <span>Al hacer click en &quot;Regístrate&quot;, aceptas nuestros 
                            <Link className={styles["disclaimer-links"]} href="#"> Términos y Condiciones</Link> y 
                            <Link className={styles['disclaimer-links']} href="#"> política de privacidad</Link>.</span>
                    </div>
                    <div className={styles['submit-button-container']}>
                        <SubmitButton active={!registerDisabled}>
                            {isLoading ? <LoadingSpinnerClear width={"18px"} /> : "Regístrate"}
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