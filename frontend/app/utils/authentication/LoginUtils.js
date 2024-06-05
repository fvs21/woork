export const DetermineEmailOrPhone = (input) => {
    return /[a-z]/i.test(input) || input == ""; //returns true if string contains a letter, hence, it is an email
}