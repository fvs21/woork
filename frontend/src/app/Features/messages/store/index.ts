import { atom, useAtom } from "jotai";
import { Chat, Message, MessagesListRecipient, SelectedChat } from "../types";
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

    //function to add a message to the users chat ui
    const addMessage = (message: Message) => {
        queryClient.setQueryData(['chat', message.chatId], 
            (prevData: Chat) => ({
                ...prevData,
                messages: [message, ...(prevData?.messages ? prevData.messages : [])]
            })
        );

        let chatList: Array<MessagesListRecipient> = queryClient.getQueryData(['chats']);
        const index: number = chatList.findIndex(elem => elem.chatId == message.chatId);

        if(index == -1) {
            const createdChat: MessagesListRecipient = {
                chatUser: message.sender,
                lastMessage: message,
                messagesUnread: 0,
                chatId: message.chatId
            };

            queryClient.setQueryData(['chats'], 
                (prevData: Array<MessagesListRecipient>) => [
                    createdChat, ...prevData
                ]
            )
        } else {
            let oldListElement: MessagesListRecipient = chatList[index];
            chatList.splice(index);

            let updatedListElement: MessagesListRecipient = {
                ...oldListElement,
                lastMessage: message
            };

            queryClient.setQueryData(['chats'], 
                (prevData: Array<MessagesListRecipient>) => [
                    updatedListElement, ...prevData
                ]
            );
        }
    }

    return { addMessage };
}