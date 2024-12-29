import { api } from "@/api/axios"
import { useQuery } from "react-query"
import { Chat, MessagesListRecipient } from "../types";

export const useCurrentChats = () => {
    const { data, isLoading } = useQuery({
        queryFn: async (): Promise<Array<MessagesListRecipient>> => {
            const request = await api.get("/chats");
            return request.data;
        },
        queryKey: ['chats'],
        refetchOnWindowFocus: false
    });

    return { data, isLoading };
}

export const useLoadChat = (id: number) => {
    const { data, isLoading } = useQuery({
        queryFn: async (): Promise<Chat> => {
            const request = await api.get("/chats/" + id);
            return request.data;
        },
        queryKey: ['chat', id],
        refetchOnWindowFocus: false
    });

    return { data, isLoading };
}