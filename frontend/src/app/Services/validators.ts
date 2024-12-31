import { Address } from "@/types/global";
import moment from "moment";

const validCountryCodes = ["52", "1"];

export const validateName = (name: string): boolean => {
    return name != "";
}

export const validatePhoneNumber = (phoneNumber: string): boolean => {
    //TODO
    return /^[0-9]*$/.test(phoneNumber) && phoneNumber.length == 10; //Mexico phone number length
}

export const validateCountryCode = (code: string): boolean => {
    return validCountryCodes.includes(code);
}

export const validatePassword = (password: string): boolean => {
    return password.length >= 8;
}

export const validateAge = (dob: string): boolean => {
    const dateFormat = "YYYY-MM-DD";

    return moment().diff(moment(dob, dateFormat), 'years') >= 18;
}

export const validateEmail = (email: string): boolean => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

export const validateRegisterBody = (body): boolean => {
    if(!validateName(body.firstName)) {return false;}
    if(!validateName(body.lastName)) {return false;}
    if(!validatePassword(body.password)) {return false;}
    if(!validateCountryCode(body.countryCode)) {return false;}
    if(!validatePhoneNumber(body.phone)) {return false;}
    if(!validateAge(body.dateOfBirth)) {return false;}

    return true;
}

//string of only characters
export const validateString = (text: string): boolean => {
    return /^([^0-9]*)$/.test(text) && text !== "";
}

export const validateNumber = (text): boolean => {
    return /^[0-9]*$/.test(text) && text !== "";
}

export const validateStreet = (text): boolean => {
    return /^[0-9]*[a-zA-Z]+[a-zA-Z0-9, ]*$/.test(text) && text !== "";
}

export const validateAddress = (address: Address): boolean => {
    if(!validateString(address?.country)) {
        return false;
    }
    if(!validateString(address?.state)) {
        return false;
    }
    if(!validateString(address?.city)) {
        return false;
    }
    if(!validateStreet(address?.street)) {
       return false;
    }
    if(!validateNumber(address?.number)) {
        return false;
    }
    if(!validateNumber(address?.zip_code)) {
        return false;
    }
    return true;
}

export const validateJobPostingDate = (date): boolean => {
    const default_day = new Date().getDate();
    const default_month = new Date().getMonth()+1;
    const default_year = new Date().getFullYear();

    if(date.year < default_year)
        return false;
    else if(date.year == default_year) {
        if(date.month < default_month)
            return false;
        else if(date.month == default_month) {
            if(date.day < default_day)
                return false
        }
    }
    return true;
}