import { useEffect, useState } from "react";
import { stringifyDateOfBirth } from "@/utils/authentication/RegisterUtils";
import InputDate from "@/components/InputDate/InputDate";
import { validateAge } from "@/services/validators";
import InputLabel from "@/components/ValidatedInput/InputLabel";
import styles from "./Registration.module.scss";

export default function RegisterDateInput({dateOfBirth, setDateOfBirth, label}) {
    const [active, setActive] = useState(false);
    const [dateValid, setDateValid] = useState(false);
    
    const default_day = new Date().getDate();
    const default_month = new Date().getMonth()+1;
    const default_year = new Date().getFullYear();

    //const { errors } = usePage().props;
    //const errorMsg = "No cumples con el requisito de edad para poder registrarte.";

    const errors = "";


    const changeDateOfBirth = (e) => {
        const value = e.target.value;
        const target = e.target.name;

        if(target === "month") {
            setDateOfBirth({
                ...dateOfBirth,
                month: value
            });
        } else if(target === "year") {
            setDateOfBirth({
                ...dateOfBirth,
                year: value
            });
        } else if(target === "day") {
            setDateOfBirth({
                ...dateOfBirth,
                day: value
            });
        }
    }

    function displayError() {
        if(!dateValid) {
            if(errors.dob || dateOfBirth.error)
                return true;
        }
    }

    useEffect(() => {
        function checkDateOfBirth() {
            if(default_year === dateOfBirth.year && default_month === dateOfBirth.month && default_day === dateOfBirth.day) {
                return;
            }
            const dob = stringifyDateOfBirth(dateOfBirth.year, dateOfBirth.month-1, dateOfBirth.day);
        
            if(!validateAge(dob)) {
                setDateValid(false);
            } else {
                setDateValid(true);
            }
        }
        checkDateOfBirth();

    }, [dateOfBirth.month, dateOfBirth.day, dateOfBirth.year, active]);
    
    return (
        <div className={styles['input-field']}>
            {label && <InputLabel>Fecha de nacimiento</InputLabel> }
            <InputDate 
                className={styles['date-input']}
                month={dateOfBirth.month} 
                day={dateOfBirth.day} 
                year={dateOfBirth.year} 
                changeDateOfBirth={changeDateOfBirth} 
                valid={true} 
                setActive={setActive} 
                yearsArray={[...Array(101)].map((x, i) => default_year-100+i)}/>
            {
                (displayError()) &&  <span style={{position: "absolute"}} className="error-msg">{errorMsg || errors.dob}</span>
            }  
        </div>
    )
}