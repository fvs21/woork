"use client"

import { useAuth } from "@/api/hooks/authentication";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client, Message, over } from "stompjs";
import { Message as ChatMessage, MessageEvent, MessagesListRecipient } from "@/features/messages/types";
import { useUser } from "@/api/hooks/user";
import { chatMutations, useStompClient } from "@/features/messages/store";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

function useWebSockets(): { connected: boolean; connect: () => Client; } {
    let stompClient: Client | null = null;
    const [token] = useAuth();
    const [connected, setConected] = useState<boolean>(false);

    const { addMessage, readChat, newChat } = chatMutations();

    function connect(): Client {
        const socket = new SockJS("http://localhost:8000/ws");
        stompClient = over(socket); 

        stompClient.connect({
            Authorization: 'Bearer ' + token
        }, onConnected, onError);

        return stompClient;
    }

    function onConnected(): void {
        setConected(true);

        if(stompClient) {
            stompClient.subscribe(`/user/queue/messages`, onMessageReceived);
            stompClient.subscribe(`/user/queue/notifications`, onNotificationReceived);
        }
    }

    function onError(): void {
        setConected(false);
    }

    function onNotificationReceived(payload: Message) {
        console.log(JSON.parse(payload.body));
        
    }

    function onMessageReceived(payload: Message) {
        const message: MessageEvent = JSON.parse(payload.body);
        
        switch(message.eventType) {
            case 'new_chat':
                newChat(message.eventPayload as MessagesListRecipient);
            case 'new_message':
                addMessage(message.eventPayload as ChatMessage);
            case 'chat_read':
                readChat(message.eventPayload as number);
        }
    }

    return { connected, connect };
}

export default function WebSocketsProvider({children}) {
    const { connected, connect } = useWebSockets();
    const [user] = useUser();
    const [, setStompClient] = useStompClient();

    useEffect(() => {
        if(user && !connected) {
            let client: Client = connect();
            setStompClient(client);
        }
    }, [user]);

    if(user && !connected)
        return (
            <LoadingScreen />
        )

    return children;
}