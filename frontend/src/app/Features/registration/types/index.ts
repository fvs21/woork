export type RegistrationBody = {
    firstName: string;
    lastName: string;
    countryCode: string;
    phone: string;
    dateOfBirth: string;
    password: string;
}

export type Fullname = {
    firstName: string;
    lastName: string;
}

export type PhoneNumber = {
    countryCode: string;
    phone: string;
}

export type DateOfBirth = {
    day: number;
    month: number;
    year: number;  
}