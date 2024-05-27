import axios from "axios";

export const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

export const calculateAge = (dob) => {
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    let month = today.getMonth() - (dob.getMonth()-1);
    let days = today.getDate() - dob.getDate();
    
    if(month < 0) {
        age--;
        month += 12;
    }
    else if(month == 0) {
        if(days < 0) {
            age--;
            days += daysInMonth(dob.getFullYear(), dob.getMonth()+1); 
        } else {
            age++;
        }
    }
    return age;
}

export const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
]