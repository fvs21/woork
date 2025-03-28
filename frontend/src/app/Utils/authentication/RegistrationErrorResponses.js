export const PHONE_NUMBER_TAKEN_ERROR = "Phone number provided is already taken";

export const INVALID_PHONE_NUMBER_ERROR = "Invalid phone number";

const REGISTRATION_ERROR = "Registration error: "

export const INVALID_AGE_ERROR = REGISTRATION_ERROR + "User must be over the age of 18";

export const FIRSTNAME_NULL_ERROR = REGISTRATION_ERROR + "First name cannot be null"

export const LASTNAME_NULL_ERROR = REGISTRATION_ERROR + "Last name cannot be null";

export const PHONE_LENGTH_ERROR = REGISTRATION_ERROR + "Phone number cannot be null";

export const PASSWORD_ERROR = REGISTRATION_ERROR + "Password must be at least 8 characters long and maximum 16 characters long";

export const INCORRECT_VERIFICATION_CODE_ERROR = "The code provided is incorrect";

export const VERIFICATION_CODE_EXPIRED_ERROR = "Verification code expired";

export const VERIFICATION_CODE_REFRESH_TIME_ERROR = "Unable to generate verification code: There is a refresh time between code generation";