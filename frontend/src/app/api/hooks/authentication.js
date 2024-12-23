import { useMutation, useQueryClient } from "react-query";
import { api, apiGuest } from "../axios";
import { useUser } from "./user";

export const refresh = async () => {
    try {
        const request = await apiGuest.get("/auth/refresh");
        return request;
    } catch {
        return null;
    }
}

export const fetchUser = async () => {
    try {
        return await api.get("/user/verify");
    } catch {
        return null;
    }
}

export const useAuth = () => {
    const queryClient = useQueryClient();

    const setAccessToken = (token) => {
        queryClient.setQueryData(['access-token'], token);
    }

    return [
        queryClient.getQueryData(['access-token']),
        setAccessToken
    ];
}

export const useLogin = () => {
    const[, setUser] = useUser();
    const [,setToken] = useAuth();

    const { mutateAsync: login, isLoading, isSuccess } = useMutation({
        mutationFn: async (body) => {
            return await apiGuest.post("/auth/login", body);
        },
        onSuccess: (data) => {
            setUser(data.data.user);
            setToken(data.data.accessToken);
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
        mutationFn: async (body) => {
            return await apiGuest.post("/auth/register", body);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(
                ['user-info'],
                data.data.user
            );
            queryClient.setQueryData(
                ['access-token'],
                data.data.accessToken
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
        onSuccess: () => {
            setTimeout(() => {
                queryClient.removeQueries(['user-info']);
                queryClient.removeQueries(['access-token']);
            }, 2000);
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
        mutationFn: async (body) => {
            return await api.post("/auth/verify-phone", body);
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
            return await api.put("/auth/phone/update", body);
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
        mutationFn: async (body) => {
            return await api.put("/auth/email/update", body);
        },
        onSuccess: (data) => {
            setUser(data.data);
        }
    });

    return { updateEmail, isLoading };
}

export const useVerifyEmail = () => {
    const [, setUser] = useUser();

    const { mutateAsync: verify, isLoading } = useMutation({
        mutationFn: async (body) => {
            return await api.post("/auth/verify-email", body);
        },
        onSuccess: (data) => {
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
        mutationFn: async(body) => {
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
        mutationFn: async (body) => {
            return await apiGuest.post("/auth/reset-password", body);
        }
    });

    return {
        resetPassword,
        isLoading,
        resetPasswordInvalid: isLoading || isSuccess
    };
}