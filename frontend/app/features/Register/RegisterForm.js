'use client';

import { useState } from "react";
import styles from './RegisterForm.module.scss'
import { useMutation } from "react-query";
import InputPhone from "../../components/InputPhone/InputPhone";
import ValidatedInput from "../../components/ValidatedInput/ValidatedInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import InputDate from "../../components/InputDate/InputDate";
import axios from "../../api/axios"
import { useAuth } from "../../hooks/useAuth";

export default function RegisterForm(props) {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(month);
    const [selectedYear, setSelectedYear] = useState(year); 
    const [selectedDay, setSelectedDay] = useState(day);
    const [password, setPassword] = useState("");

    const { setAuth } = useAuth();

    const body = {
        "firstName": firstName,
        "lastName": lastName,
        "countryCode": countryCode,
        "phone": phone,
        "dateOfBirth": new Date(selectedYear, selectedMonth, selectedDay).toISOString().split('T')[0],
        "password": password
    }

    const { mutateAsync: registerUserMutation } = useMutation({
        mutationFn: async () => {
            return await axios.post(
                '/auth/register', 
                body
            );
        },  
    })

    async function handleSubmit(e) {
        e.preventDefault();
        
        
        try {
            const request = await registerUserMutation();
            setAuth(request.data)
            props.setStep(1);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <>
            <div className={styles['form-title']}>
                <h2>Bienvenid@ a woork!</h2>
            </div>
            <hr className={styles["hr-style"]}/>
            <br/>
            <form onSubmit={handleSubmit} method="post">
                <div className={styles["name-input-container"]}>
                    <ValidatedInput name={"firstName"} value={firstName} type={"text"} placeholder={"Nombre"} changeValue={setFirstName} autofocus={false}/>
                    <ValidatedInput name={"lastName"} value={lastName} type={"text"} placeholder={"Apellido"} changeValue={setLastName} autofocus={false}/>
                </div>
                <br/>
                <InputPhone label={"Número de teléfono"} countryCode={countryCode} changeCountryCode={setCountryCode} number={phone} changeNumber={setPhone} autofocus={false}/>
                <br/>
                <ValidatedInput name={"password"} value={password} type={"password"} label={"Contraseña"} placeholder={"Contraseña"} changeValue={setPassword} />
                <br/>
                <InputDate month={selectedMonth} changeMonth={setSelectedMonth} day={selectedDay} changeDay={setSelectedDay}
                    year={selectedYear} changeYear={setSelectedYear}/>
                <br/>
                <SubmitButton>Regístrate</SubmitButton>
            </form>
            <br/>
            <div className={styles['div-center']}>   
                <span className={`${styles['buttom-links']}`}>
                    <a href="/login">Ya tienes una cuenta?</a>
                </span>
            </div>
        </>
    )
}