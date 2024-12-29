"use client"

import { useAuth } from "@/api/hooks/authentication";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import SockJS from "sockjs-client";
import { Client, Message, over } from "stompjs";
import { Chat, Message as ChatMessage } from "@/features/messages/types";
import { useUser } from "@/api/hooks/user";
import { chatMutations, useStompClient } from "@/features/messages/store";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

function useWebSockets(): { connected: boolean; connect: () => Client; } {
    let stompClient: Client | null = null;
    const [token] = useAuth();
    const [connected, setConected] = useState<boolean>(false);

    const { addMessage } = chatMutations();

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
        }
    }

    function onError(): void {
        setConected(false);
    }

    function onMessageReceived(payload: Message) {
        const message: ChatMessage = JSON.parse(payload.body);
        
        addMessage(message);
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