export function checkIfValidImage(file) {
    const validTypes = ["image/jpeg", "image/jpg"];
    return validTypes.includes(file.type);
}

export const defaultPfpUrl = "http://localhost:8000/api/images/default-pfp";

export function formatGender(gender) {
    switch(gender) {
        case "Male":
            return "Hombre";
        case "Female":
            return "Mujer";
        default:
            return gender;
    }
}

export function formatAddress(address) {
    return `${address?.street}, ${address?.number}. C.P. ${address?.zipCode} - ${address?.city}, ${address?.state}, ${address?.country}`
}