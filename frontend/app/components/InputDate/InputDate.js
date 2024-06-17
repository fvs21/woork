import InputLabel from "../ValidatedInput/InputLabel";
import styles from "./InputDate.module.scss";
import { daysInMonth, months } from "../../utils/authentication/RegisterUtils";

export default function InputDate({month, changeMonth, day, changeDay, year, changeYear}) {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <InputLabel>Fecha de nacimiento</InputLabel>
            <div className={styles['date-container']}>
                <select name="month" className={styles["date-input"]} required defaultValue={month} onChange={(e) => changeMonth(e.target.value)}>
                    {[...Array(12)].map((x, i) => 
                        <option key={months[i]} value={i}>{months[i]}</option>
                    )}
                </select>
                <select name="day" className={styles["date-input"]} required defaultValue={day} onChange={(e) => changeDay(e.target.value)}>
                    {[...Array(daysInMonth(month, year))].map((x, i) => 
                        <option key={i+1} value={i+1}>{i+1}</option>
                    )}
                </select>
                <select name="year" className={styles["date-input"]} required defaultValue={year} onChange={(e) => changeYear(e.target.value)}>
                    {[...Array(101)].map((x, i) => 
                        <option key={currentYear-100+i} value={currentYear-100+i}>{currentYear-100+i}</option>
                    )}
                </select>
            </div>
        </>
    )
}