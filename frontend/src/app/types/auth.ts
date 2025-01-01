import { User } from "./global"

export type LoginBody = {
    credential: string;
    countryCode?: number;
    password: string;
}

export type AuthenticationResponse = {
    user: User;
    accessToken: string;
}

export type CredentialVerificationBody = {
    otp: string;
}

export type UpdatePhoneBody = {
    countryCode: number;
    phone: string
}

export type ForgotPasswordBody = {
    credential: string;
}

export type ResetPasswordBody = {
    token: string;
    credential: string;
    password: string;
    confirmPassword: string;
}

export type UpdatePasswordBody = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}