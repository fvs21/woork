"use client"

import { Client, over } from "stompjs";
import styles from "./MainMessagesSection.module.scss";
import { useUser } from "@/api/hooks/user";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { useStompClient } from "../../store";
import { useAuth } from "@/api/hooks/authentication";

function useMessaging(): {connected: boolean; connect: () => Client; stompClient: Client} {
    let stompClient: Client | null = null;
    const [user] = useUser();
    const [token] = useAuth();
    
    const [connected, setConected] = useState<boolean>(false);

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

        if(stompClient)
            stompClient.subscribe(`/user/queue/messages`, onMessageReceived);
    }

    function onError(): void {
        setConected(false);
    }

    function onMessageReceived(payload: any) {
        console.log(payload);
    }

    return { connected, connect, stompClient };
}

export default function MainMessagesSection({children}) {

    const [user] = useUser();

    const { connected, connect, stompClient: client } = useMessaging();
    const [, setStompClient] = useStompClient();

    useEffect(() => {
        if(user && !connected) {
            let client: Client = connect();
            setStompClient(client);            
        }
    }, [user]);

    return (
        <div className={styles.mainMessagesSectionContainer}>
            {children}
        </div>
    )
}