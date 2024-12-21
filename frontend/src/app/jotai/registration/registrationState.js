import { atom, useAtom } from "jotai";

export const namesErrorAtom = atom("");
export const phoneNumberErrorAtom = atom("");
export const dobErrorAtom = atom("");
export const passwordErrorAtom = atom("");

export const useNamesError = () => {
    return useAtom(namesErrorAtom);
}

export const usePhoneNumberError = () => {
    return useAtom(phoneNumberErrorAtom);
}

export const useDobError = () => {
    return useAtom(dobErrorAtom);
}

export const usePasswordError = () => {
    return useAtom(passwordErrorAtom);
}