import { useEffect, useState } from "react";
import { stringifyDateOfBirth } from "../../utils/authentication/RegisterUtils";
import InputDate from "../../components/InputDate/InputDate";
import { validateAge } from "../../services/Validators";

export default function RegisterDateInput({dateOfBirth, setDateOfBirth}) {
    const [errorMsg, setErrorMsg] = useState("");
    const [active, setActive] = useState(false);
    const [dateValid, setDateValid] = useState(true);
    
    const default_day = new Date().getDate();
    const default_month = new Date().getMonth()+1;
    const default_year = new Date().getFullYear();

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

    useEffect(() => {
        function checkDateOfBirth() {
            if(active) {
                setDateValid(true);
                return;
            }
            if(default_year === dateOfBirth.year && default_month === dateOfBirth.month && default_day === dateOfBirth.day) {
                return;
            }
            const dob = stringifyDateOfBirth(dateOfBirth.year, dateOfBirth.month-1, dateOfBirth.day);
        
            if(!validateAge(dob)) {
                setDateValid(false);
                setErrorMsg("No cumples con el requisito de edad para poder registrate.")
            } else {
                setDateValid(true);
                if(errorMsg) {
                    setErrorMsg("");
                }
            }
        }
        checkDateOfBirth();

    }, [dateOfBirth.month, dateOfBirth.day, dateOfBirth.year, active]);
    
    return (
        <>
            <InputDate month={dateOfBirth.month} day={dateOfBirth.day} year={dateOfBirth.year} 
                changeDateOfBirth={changeDateOfBirth} valid={dateValid} setActive={setActive} />
            {
                !dateValid && <span className="error-msg">{errorMsg}</span>
            }  
        </>
    )
}