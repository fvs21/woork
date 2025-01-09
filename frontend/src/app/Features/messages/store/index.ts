import { atom, useAtom } from "jotai";
import { Chat, Message, MessagesListRecipient, Participant, SelectedChat } from "../types";
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
    const [, setSelectedChat] = useSelectedChat();
    const [user] = useUser();

    //function called when a user creates a new chat.
    //the backend returns the new chat id to the sender (the user that sends the first message)
    const newChat = (chat: MessagesListRecipient) => {
        queryClient.setQueryData(['chats'], 
            (prevData: Array<MessagesListRecipient>) => [
                chat, ...prevData
            ]
        );
        const message = chat.lastMessage;
        const newChatId = chat.chatId;
        const participant = chat.chatUser;
        const currentUser: Participant = {
            username: user.username,
            pfpUrl: user.pfp_url,
            name: user.firstName + user.lastName
        };

        setSelectedChat({
            chatId: newChatId,
            recipient: participant,
            create: false
        });

        const newChat: Chat = {
            messages: [message],
            id: newChatId,
            participants: [currentUser, participant],
            createdAt: new Date().toUTCString()
        }

        queryClient.setQueryData(['chat', newChatId], newChat);
    }

    //function to add a message to the users chat ui
    const addMessage = (message: Message) => {
        queryClient.setQueryData(['chat', message.chatId], 
            (prevData: Chat) => ({
                ...prevData,
                messages: [message, ...(prevData?.messages ? prevData.messages : [])]
            })
        );

        let chatList: Array<MessagesListRecipient> = queryClient.getQueryData(['chats']) || [];
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
                    createdChat, ...(chatList.length == 0 ? [] : prevData)
                ]
            )
        } else {
            const oldListElement: MessagesListRecipient = chatList[index];
            chatList.splice(index, 1);
            
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

    return { newChat, addMessage, readChat };
}