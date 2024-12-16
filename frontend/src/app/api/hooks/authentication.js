import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../axios";

export const useLogin = () => {
    const { mutateAsync: login, isLoading }  = useMutation({
        mutationFn: async (body) => {
            return await api.post("/auth/login", body);
        }
    });

    return { login, isLoading };
}

export const useAuth = () => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(['access-token']);
}