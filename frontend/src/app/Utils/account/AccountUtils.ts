import { Address } from "@/types/global";

export function checkIfValidImage(file: Blob) {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    return validTypes.includes(file.type);
}

export const defaultPfpUrl = "http://localhost:8000/api/images/default-pfp";

export function formatGender(gender: string) {
    switch(gender) {
        case "Male":
            return "Hombre";
        case "Female":
            return "Mujer";
        default:
            return gender;
    }
}

export function formatAddress(address: Address) {
    return `${address?.street}, ${address?.number}. C.P. ${address?.zip_code} - ${address?.city}, ${address?.state}, ${address?.country}`
}