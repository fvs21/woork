import moment from "moment";

const validCountryCodes = ["52", "1"];

export const validateName = (name) => {
    return name != "";
}

export const validatePhoneNumber = (phoneNumber) => {
    //TODO
    return /^[0-9]*$/.test(phoneNumber) && phoneNumber.length == 10; //Mexico phone number length
}

export const validateCountryCode = (code) => {
    return validCountryCodes.includes(code);
}

export const validatePassword = (password) => {
    return password.length >= 8;
}

export const validateAge = (dob) => {
    const dateFormat = "YYYY-MM-DD";

    return moment().diff(moment(dob, dateFormat), 'years') >= 18;
}

export const validateEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

export const validateRegisterBody = (body) => {
    if(!validateName(body.firstName)) {return false;}
    if(!validateName(body.lastName)) {return false;}
    if(!validatePassword(body.password)) {return false;}
    if(!validateCountryCode(body.countryCode)) {return false;}
    if(!validatePhoneNumber(body.phone)) {return false;}
    if(!validateAge(body.dateOfBirth)) {return false;}

    return true;
}