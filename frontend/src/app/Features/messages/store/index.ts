import { atom, useAtom } from "jotai";
import { Chat, Message, SelectedChat } from "../types";
import { Client } from "stompjs";
import { useQueryClient } from "react-query";

const selectedChatAtom = atom<SelectedChat>();

const stompClient = atom<Client>();

export const useSelectedChat = () => {
    return useAtom(selectedChatAtom);
}

export const useStompClient = () => {
    return useAtom(stompClient);
}

export const chatMutations = () => {
    const queryClient = useQueryClient();

    const addMessage = (message: Message) => {
        queryClient.setQueryData(['chat', message.chatId], 
            (prevData: Chat) => ({
                ...prevData,
                messages: [message, ...prevData.messages]
            })
        );
    }

    return { addMessage };
}