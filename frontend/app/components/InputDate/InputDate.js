import InputLabel from "../ValidatedInput/InputLabel";
import styles from "./InputDate.module.scss";
import { daysInMonth, MONTHS } from "../../utils/authentication/RegisterUtils";
import "../../assets/globals.scss";

export default function InputDate({month, day, year, changeDateOfBirth, setActive, valid}) {
    const currentYear = new Date().getFullYear();
    const dateInputStyle = `${styles['date-input']} ${!valid ? 'error-border' : ""}`;

    const focus = () => {
        setActive(true);
    }

    const blur = () => {
        setActive(false);
    }

    return (
        <>
            <InputLabel>Fecha de nacimiento</InputLabel>
            <div className={styles['date-container']}>
                <select name="month" className={dateInputStyle} required defaultValue={month} onChange={changeDateOfBirth} onFocus={focus} onBlur={blur}>
                    {[...Array(12)].map((x, i) => 
                        <option key={MONTHS[i]} value={i+1}>{MONTHS[i]}</option>
                    )}
                </select>
                <select name="day" className={dateInputStyle} required defaultValue={day} onChange={changeDateOfBirth} onFocus={focus} onBlur={blur}>
                    {[...Array(daysInMonth(month, year))].map((x, i) => 
                        <option key={i+1} value={i+1}>{i+1}</option>
                    )}
                </select>
                <select name="year" className={dateInputStyle} required defaultValue={year} onChange={changeDateOfBirth} onFocus={focus} onBlur={blur}>
                    {[...Array(101)].map((x, i) => 
                        <option key={currentYear-100+i} value={currentYear-100+i}>{currentYear-100+i}</option>
                    )}
                </select>
            </div>

        </>
    )
}