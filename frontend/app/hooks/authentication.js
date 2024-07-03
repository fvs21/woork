import {useAxiosPrivate} from "./useAxiosPrivate";
import axios from "../api/axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

export function useFetchUser() {
    const axiosPrivate = useAxiosPrivate();

    const { data, isLoading } = useQuery({
        queryFn: async () => {
            return await axiosPrivate.get('/user/verify');
        },
        queryKey: ["user-info"],
        staleTime: Infinity,
        cacheTime: 5000,
        retry: false
    });

    return { data, isLoading };
}

export function useRegisterUser(body) {
    const queryClient = useQueryClient();

    const { mutateAsync: registerUserFn, isLoading } = useMutation({
        mutationFn: async () => {
            return await axios.post(
                '/auth/register', 
                body
            );
        },  
        onSuccess: (data) => {
            queryClient.setQueryData(['user-info'], data.user);
        }
    });

    return { registerUserFn, isLoading };
}

export function useLogoutUser() {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { mutateAsync: logoutFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.get('/auth/logout');
        },
        onSuccess: () => {
            queryClient.removeQueries(['user-info']);
        }
    });

    return { logoutFn };
}

export function useLoginUser() {
    const { mutateAsync: loginUserFn } = useMutation({
        mutationFn: async (body) => {
            return await axios.post(
                '/auth/login',
                body
            );
        }
    });

    return { loginUserFn };
}

export function useUpdatePhone(body) {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { mutateAsync: updatePhoneFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.put(
                'auth/phone/update',
                body
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user-info']);
        }
    });

    return { updatePhoneFn };
}

export function useVerifyPhone(body) {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { mutateAsync: verifyPhoneFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.post(
                '/auth/phone/verify',
                body
            );
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user-info'], data);
        }
    });

    return { verifyPhoneFn };
}

export function useResendPhoneCode() {
    const axiosPrivate = useAxiosPrivate();

    const { mutateAsync: resendPhoneCodeFn, isLoading, isSuccess } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.post(
                '/auth/phone/code'
            );
        }
    });

    return { resendPhoneCodeFn, isLoading, isSuccess };
}

export function useUpdateEmail(body) {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { mutateAsync: updateEmailFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.put(
                '/auth/email/update',
                body
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user-info']);
        }
    });

    return { updateEmailFn };
}

export function useVerifyEmail(body) {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { mutateAsync: verifyEmailFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.post(
                '/auth/email/verify',
                body
            );
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user-info'], data);
        }
    });

    return { verifyEmailFn };
}

export function useResendEmailCode() {
    const axiosPrivate = useAxiosPrivate();

    const { mutateAsync: resendEmailCodeFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.post(
                "/auth/email/code"
            );
        }
    });

    return { resendEmailCodeFn };
}

export function useUpdatePfp(body) {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const formData = new FormData();
    formData.append("image", body);
    
    const { mutateAsync: updatePfpFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.put(
                '/user/pfp/update',
                formData
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user-info']);
        }
    });

    return { updatePfpFn };
}

export function useUpdateLocation(body) {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const { mutateAsync: updateLocationFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.put(
                '/user/location/update',
                body
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user-info']);
        }
    });

    return { updateLocationFn };
}

