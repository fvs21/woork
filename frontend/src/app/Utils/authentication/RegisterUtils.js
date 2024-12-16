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

export const parsePhoneNumber = (countryCode, phoneNumber) => {
    const defaultCountryCode = String(countryCode);
    const length = defaultCountryCode.length + String(phoneNumber).length;
    const defaultPhoneNumber = String(phoneNumber).slice(defaultCountryCode.length, length);

    return defaultPhoneNumber;
}