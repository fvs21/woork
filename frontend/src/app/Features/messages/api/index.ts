import { api } from "@/api/axios"
import { useQuery, useQueryClient } from "react-query"
import { Chat, Message, MessagesListRecipient } from "../types";

export const useCurrentChats = () => {
    const { data, isLoading } = useQuery({
        queryFn: async (): Promise<Array<MessagesListRecipient>> => {
            const request = await api.get("/chats");
            return request.data;
        },
        queryKey: ['chats']
    });

    return { data, isLoading };
}

export const useLoadChat = (id: number) => {
    const { data, isLoading } = useQuery({
        queryFn: async (): Promise<Chat> => {
            const request = await api.get("/chats/" + id);
            return request.data;
        },
        queryKey: ['chat', id]
    });

    return { data, isLoading };
}