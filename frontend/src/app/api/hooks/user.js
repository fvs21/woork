import { useQueryClient } from "react-query";

export const useUser = () => {
    const queryClient = useQueryClient();

    return queryClient.getQueryData(['user-info']);
}