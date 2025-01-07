import { api } from "@/api/axios"
import { useQuery } from "react-query"
import { Notification } from "../types";

export const useNotifications = () => {
    const { data, isLoading } = useQuery({
        queryFn: async (): Promise<Array<Notification>> => {
            const request = await api.get("/notification");
            return request.data;
        },
        queryKey: ['notifications']
    });

    return { data, isLoading };
}