import { useQueryClient } from "react-query";

export function useUser() {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(['user-info'])?.data;
}