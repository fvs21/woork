import styles from "./InputDate.module.scss";
import { daysInMonth, MONTHS } from "@/utils/authentication/RegisterUtils";

type InputDateProps = {
    month: number;
    day: number;
    year: number;
    changeDateOfBirth: (e) => void;
    setActive: (val: boolean) => void;
    yearsArray: Array<number>;
    className: string;
}

export default function InputDate({month, day, year, changeDateOfBirth, setActive, yearsArray, className}: InputDateProps) {
    const focus = () => {
        setActive(true);
    }

    const blur = () => {
        setActive(false);
    }

    return (
        <>
            <div className={styles['date-container']}>
                <select name="month" className={className} required defaultValue={month} onChange={changeDateOfBirth} onFocus={focus} onBlur={blur}>
                    {[...Array(12)].map((x, i) => 
                        <option key={MONTHS[i]} value={i+1}>{MONTHS[i]}</option>
                    )}
                </select>
                <select name="day" className={className} required defaultValue={day} onChange={changeDateOfBirth} onFocus={focus} onBlur={blur}>
                    {[...Array(daysInMonth(month, year))].map((x, i) => 
                        <option key={i+1} value={i+1}>{i+1}</option>
                    )}
                </select>
                <select name="year" className={className} required defaultValue={year} onChange={changeDateOfBirth} onFocus={focus} onBlur={blur}>
                    {yearsArray.map((x, i) => 
                        <option key={x} value={x}>{x}</option>
                    )}
                </select>
            </div>
        </>
    )
}