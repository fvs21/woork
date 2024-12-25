import { useMutation, useQueryClient } from "react-query";
import { api, apiGuest } from "../axios";
import { useUser } from "./user";
import { logoutServer } from "../server/actions";
import { AuthenticationResponse, CredentialVerificationBody, ForgotPasswordBody, LoginBody, RegistrationBody, ResetPasswordBody, UpdatePasswordBody, UpdatePhoneBody } from "@/types/auth";
import { AxiosResponse } from "axios";
import { User } from "@/types/global";

export const refresh = async () => {
    try {
        return await apiGuest.get("/auth/refresh");
    } catch {
        return null;
    }
}

export const fetchUser = async () => {
    try {
        return await api.get<User>("/user/verify");
    } catch {
        return null;
    }
}

export const useAuth = (): [string, Function] => {
    const queryClient = useQueryClient();

    const setAccessToken = (token: string) => {
        queryClient.setQueryData(['access-token'], token);
    }

    return [
        queryClient.getQueryData(['access-token']),
        setAccessToken
    ];
}

export const useLogin = () => {
    const[,setUser] = useUser();
    const [,setToken] = useAuth();

    const { mutateAsync: login, isLoading, isSuccess } = useMutation({
        mutationFn: async (body: LoginBody) => {
            return await apiGuest.post<AuthenticationResponse>("/auth/login", body);
        },
        onSuccess: (data) => {
            const responseData: AuthenticationResponse = data.data;
            setUser(responseData.user);
            setToken(responseData.accessToken);
        }
    });

    return { 
        login,
        isLoading,
        loginDisabled: (isLoading || isSuccess)
    };
}

export const useRegister = () => {
    const queryClient = useQueryClient();
    
    const { mutateAsync: register, isLoading, isSuccess } = useMutation({
        mutationFn: async (body: RegistrationBody) => {
            return await apiGuest.post<AuthenticationResponse>("/auth/register", body);
        },
        onSuccess: (data) => {
            const responseData: AuthenticationResponse = data.data;

            queryClient.setQueryData(
                ['user-info'],
                responseData.user
            );
            queryClient.setQueryData(
                ['access-token'],
                responseData.accessToken
            ); 
        }
    });

    return { 
        register, 
        isLoading, 
        registerDisabled: isLoading || isSuccess 
    };
}

export const useLogout = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: logout, isLoading, isSuccess } = useMutation({
        mutationFn: async () => {
            return await api.get("/auth/logout");
        }, 
        onSuccess: async () => {
            setTimeout(() => {
                queryClient.removeQueries(['user-info']);
                queryClient.removeQueries(['access-token']);
            }, 2000);

            await logoutServer();
        }
    });

    return { 
        logout, 
        isLoading,
        logoutDisabled: isLoading || isSuccess 
    };
}

export const useVerifyPhone = () => {
    const [, setUser] = useUser();

    const { mutateAsync: verify, isLoading } = useMutation({
        mutationFn: async (body: CredentialVerificationBody) => {
            return await api.post<User>("/auth/verify-phone", body);
        },
        onSuccess: (data) => {
            setUser(data.data);
        }
    });

    return { verify, isLoading };
}

export const useResendPhoneVerificationCode = () => {
    const { mutateAsync: resend, isLoading } = useMutation({
        mutationFn: async () => {
            return await api.post("/auth/verify-phone/resend");
        }
    });

    return { resend, isLoading };
}

export const useUpdatePhone = () => {
    const [, setUser] = useUser();

    const { mutateAsync: updatePhone, isLoading } = useMutation({
        mutationFn: async (body) => {
            return await api.patch<User>("/auth/phone/update", body);
        },
        onSuccess: (data) => {            
            setUser(data.data);
        }
    });

    return { updatePhone, isLoading };
}

export const useUpdateEmail = () => {
    const [, setUser] = useUser();

    const { mutateAsync: updateEmail, isLoading } = useMutation({
        mutationFn: async (body: UpdatePhoneBody) => {
            return await api.patch<User>("/auth/email/update", body);
        },
        onSuccess: (data: AxiosResponse) => {
            setUser(data.data);
        }
    });

    return { updateEmail, isLoading };
}

export const useVerifyEmail = () => {
    const [, setUser] = useUser();

    const { mutateAsync: verify, isLoading } = useMutation({
        mutationFn: async (body: CredentialVerificationBody) => {
            return await api.post("/auth/verify-email", body);
        },
        onSuccess: (data: AxiosResponse) => {
            setUser(data.data);
        }
    });

    return { verify, isLoading };
}

export const useResendEmailVerificationCode = () => {
    const { mutateAsync: resend } = useMutation({
        mutationFn: async () => {
            return await api.post("/auth/verify-email/resend");
        }
    });

    return { resend };
}

export const useForgotPassword = () => {
    const { mutateAsync: forgotPassword, isLoading, isSuccess } = useMutation({
        mutationFn: async(body: ForgotPasswordBody) => {
            return await api.post("/auth/forgot-password", body);
        }
    });

    return { 
        forgotPassword, 
        isLoading, 
        forgotPasswordInvalid: isLoading || isSuccess 
    };
}

export const useResetPassword = () => {
    const { mutateAsync: resetPassword, isLoading, isSuccess } = useMutation({
        mutationFn: async (body: ResetPasswordBody) => {
            return await apiGuest.post("/auth/reset-password", body);
        }
    });

    return {
        resetPassword,
        isLoading,
        resetPasswordInvalid: isLoading || isSuccess
    };
}

export const useUpdatePassword = () => {
    const { mutateAsync: update, isLoading, isSuccess } = useMutation({
        mutationFn: async (body: UpdatePasswordBody) => {
            return await api.patch("/auth/password/update", body);
        }
    });

    return { 
        update,
        isLoading,
        updatePasswordInvalid: isLoading || isSuccess
    };
}

export const useAuthenticatedForgotPassword = () => {
    const { mutateAsync: forgotPassword, isLoading, isSuccess } = useMutation({
        mutationFn: async () => {
            return await api.post("/auth/forgot-password/authenticated");
        }
    });

    return {
        forgotPassword,
        isLoading,
        forgotPasswordInvalid: isLoading || isSuccess
    };
}