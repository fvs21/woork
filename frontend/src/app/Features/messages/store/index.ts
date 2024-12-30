import { atom, useAtom } from "jotai";
import { Chat, Message, MessagesListRecipient, SelectedChat } from "../types";
import { Client } from "stompjs";
import { useQueryClient } from "react-query";
import { useUser } from "@/api/hooks/user";

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
    const [user] = useUser();

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
                messagesUnread: 1,
                chatId: message.chatId
            };

            queryClient.setQueryData(['chats'], 
                (prevData: Array<MessagesListRecipient>) => [
                    createdChat, ...prevData
                ]
            )
        } else {
            const oldListElement: MessagesListRecipient = chatList[index];
            chatList.splice(index);
            
            const messagesUnread = message.sender.username == user.username ? oldListElement.messagesUnread : oldListElement.messagesUnread + 1;

            let updatedListElement: MessagesListRecipient = {
                ...oldListElement,
                lastMessage: message,
                messagesUnread: messagesUnread
            };

            queryClient.setQueryData(['chats'], 
                (prevData: Array<MessagesListRecipient>) => [
                    updatedListElement, ...prevData
                ]
            );
        }
    }

    const readChat = (chatId: number): void => {
        const chat: Chat = queryClient.getQueryData(['chat', chatId]);
        if(!chat)
            return;

        let chatMessages: Array<Message> = chat.messages;

        for(let i = 0; i<chatMessages.length; i++) {
            if(chatMessages[i].readAt != null)
                break;

            chatMessages[i].readAt = (new Date()).toUTCString();
        }

        queryClient.setQueryData(['chat', chatId], 
            (prevData: Chat) => ({
                ...prevData,
                messages: chatMessages
            })
        );
    }

    return { addMessage, readChat };
}