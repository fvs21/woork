import InputLabel from "../ValidatedInput/InputLabel";
import styles from "./InputDate.module.scss";
import { daysInMonth, months } from "../../utils/authentication/RegisterUtils";

export default function InputDate({month, changeMonth, day, changeDay, year, changeYear}) {
    return (
        <>
            <InputLabel>Fecha de nacimiento</InputLabel>
            <div className={styles['date-container']}>
                <select name="month" className={styles["date-input"]} required defaultValue={month} onChange={(e) => changeMonth(e.target.value)}>
                    {[...Array(12)].map((x, i) => 
                        <option value={i+1}>{months[i]}</option>
                    )}
                </select>
                <select name="day" className={styles["date-input"]} required defaultValue={day} onChange={(e) => changeDay(e.target.value)}>
                    {[...Array(daysInMonth(month, year))].map((x, i) => 
                        <option value={i+1}>{i+1}</option>
                    )}
                </select>
                <select name="year" className={styles["date-input"]} required defaultValue={year} onChange={(e) => changeYear(e.target.value)}>
                    {[...Array(124)].map((x, i) => 
                        <option value={year-123+i}>{year-123+i}</option>
                    )}
                </select>
            </div>
        </>
    )
}