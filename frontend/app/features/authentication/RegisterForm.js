'use client';

import { useState } from "react";
import styles from './AuthForms.module.scss'
import { daysInMonth, months } from "../../utils/authentication/RegisterUtils";
import Form from "../../components/form/Form";
import { useMutation } from "react-query";
import { registerUser } from "../../actions/authentication/Authentication";

export default function RegisterForm() {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const [selectedMonth, setSelectedMonth] = useState(month);
    const [selectedYear, setSelectedYear] = useState(year); 

    const { mutateAsync: registerUserMutation } = useMutation({
        mutationFn: registerUser,
    })

    async function handleSubmit(formData) {
        const data = Object.fromEntries(
            formData.entries()
        );

        const body = {
            'firstName': data.firstName,
            'lastName': data.lastName,
            'countryCode': data['country_code'],
            'password': data.password,
            'phone': data.phoneNumber,
            'dateOfBirth': new Date(data.year, data.month, data.day).toISOString().split('T')[0]
        }
 
        try {
            const response = await registerUserMutation(body);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form>
            <h2>Bienvenid@ a woork!</h2>
            <form action={handleSubmit} method="post">
                <div className={styles["input-container"]}>
                    <input name="firstName" type="text" placeholder="Nombre" className={styles["form-input"]} required/>
                    <input name="lastName" type="text" placeholder="Apellido" className={styles["form-input"]} required/>
                </div>
                <br/>
                <label className={styles["input-label"]}>Número de teléfono</label>
                <div className={styles["input-container"]}>
                    <select name="country_code" className={`${styles["form-input"]} ${styles['select-form']}`} required defaultValue="">
                        <option value="" disabled>País/Región</option>
                        <option value="1">México (+52)</option>
                        <option value="2">Estados Unidos (+1)</option>
                    </select>
                    <input name="phoneNumber" type="text" placeholder="Número de teléfono" className={styles["form-input"]}/>
                </div>
                <br/>
                <label className={styles['input-label']}>Contraseña</label>
                <div className={styles['input-container']}>
                    <input name="password" type="password" placeholder="Contraseña" className={styles['form-input']} required/>
                </div>
                <br/>
                <label className={styles["input-label"]}>Fecha de nacimiento</label>
                <div className={styles["input-container"]}>
                    <select name="month" className={styles["form-input"]} required defaultValue={month} onChange={(e) => setSelectedMonth(e.target.value)}>
                        {[...Array(12)].map((x, i) => 
                            <option value={i+1}>{months[i]}</option>
                        )}
                    </select>
                    <select name="day" className={styles["form-input"]} required defaultValue={day}>
                        {[...Array(daysInMonth(selectedMonth, selectedYear))].map((x, i) => 
                            <option value={i+1}>{i+1}</option>
                        )}
                    </select>
                    <select name="year" className={styles["form-input"]} required defaultValue={year} onChange={(e) => setSelectedYear(e.target.value)}>
                        {[...Array(124)].map((x, i) => 
                            <option value={year-123+i}>{year-123+i}</option>
                        )}
                    </select>
                </div>
                <br/>
                <div className={styles["input-container"]}>
                    <button type="sumbit" className={`${styles['form-input']} ${styles['submit-btn']}`}>Regístrate</button>
                </div>
            </form>
        </Form>
    )
}