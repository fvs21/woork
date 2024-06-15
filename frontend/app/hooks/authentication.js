import {useAxiosPrivate} from "./useAxiosPrivate";
import axios from "../api/axios";
import { useQuery, useMutation } from "react-query";

export function useFetchUser() {
    const axiosPrivate = useAxiosPrivate();

    const {data, isLoading} = useQuery({
        queryFn: async () => {
            return await axiosPrivate.get('/user/verify');
        },
        queryKey: ["user-info"],
        staleTime: Infinity,
        cacheTime: 5000
    });

    return { data, isLoading };
}

export function useRegisterUser(body) {
    const { mutateAsync: registerUserFn } = useMutation({
        mutationFn: async () => {
            return await axios.post(
                '/auth/register', 
                body
            );
        },  
    });

    return { registerUserFn };
}

export function useUpdatePhone(body) {
    const axiosPrivate = useAxiosPrivate();

    const { mutateAsync: updatePhoneFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.put(
                'auth/phone/update',
                body
            );
        }
    });

    return { updatePhoneFn };
}

export function useVerifyPhone(body) {
    const axiosPrivate = useAxiosPrivate();

    const { mutateAsync: verifyPhoneFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.post(
                '/auth/phone/verify',
                body
            );
        },
        mutationKey: ['user-info']
    });

    return { verifyPhoneFn };
}

export function useUpdateEmail(body) {
    const axiosPrivate = useAxiosPrivate();

    const { mutateAsync: updatePhoneFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.put(
                '/auth/email/update',
                body
            );
        }
    });

    return { updatePhoneFn };
}

export function useVerifyEmail(body) {
    const axiosPrivate = useAxiosPrivate();

    const { mutateAsync: verifyEmailFn } = useMutation({
        mutationFn: async () => {
            return await axiosPrivate.post(
                '/auth/email/verify',
                body
            );
        }
    });

    return { verifyEmailFn };
}

export function useUpdatePfp(body) {
    //TODO
}
