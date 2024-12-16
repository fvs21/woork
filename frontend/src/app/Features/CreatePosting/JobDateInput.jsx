import InputDate from "@/Components/InputDate/InputDate";
import InputLabel from "@/Components/ValidatedInput/InputLabel";
import { validateJobPostingDate } from "@/Services/validators";
import { useEffect, useState } from "react";
import styles from "./CreatePosting.module.scss";

export default function JobDateInput({date, setDate}) {
    const [active, setActive] = useState(false);
    const [dateValid, setDateValid] = useState(true);
    
    const default_day = new Date().getDate();
    const default_month = new Date().getMonth()+1;
    const default_year = new Date().getFullYear();

    const changeDate = (e) => {
        const value = e.target.value;
        const target = e.target.name;

        if(target === "month") {
            setDate({
                ...date,
                month: value
            });
        } else if(target === "year") {
            setDate({
                ...date,
                year: value
            });
        } else if(target === "day") {
            setDate({
                ...date,
                day: value
            });
        }
    }

    useEffect(() => {
        function checkDateValid() {
            if(active) {
                setDateValid(true);
                return;
            }

            if(default_year === date.year && default_month === date.month && default_day === date.day) {
                return;
            }

            if(!validateJobPostingDate(date)) {
                setDateValid(false); 
            } else {
                setDateValid(true);
            }

        }
        checkDateValid();
    }, [date.day, date.month, date.year, active]);

    return (
        <div className={styles['input-field']}>
            <InputLabel>Fecha</InputLabel>
            <div style={{fontSize: "14px"}}>Elige la fecha en la que se requerirá el servicio.</div>
            <br/>
            <InputDate 
                month={date.month} 
                day={date.day} 
                year={date.year} 
                changeDateOfBirth={changeDate} 
                valid={dateValid}
                setActive={setActive}
                yearsArray={[default_year, default_year+1]}/>
        </div>
    )
}