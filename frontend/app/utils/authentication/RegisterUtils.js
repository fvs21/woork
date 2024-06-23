import moment from "moment";

export const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

export const MONTHS = [
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

export const stringifyDateOfBirth = (year, month, day) => {
    return new Date(year, month, day).toISOString().split('T')[0]
} 
