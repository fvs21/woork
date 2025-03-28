"use client";

import { useState } from "react";
import { setUpdateFlashes, deleteAll } from "../flashMessageCreator";
import { useEffect } from "react";
import FlashAlert from "@/components/FlashAlert/FlashAlert";
import { FlashMessage } from "../types/flashMessagesTypes";

export default function FlashRenderer() {
    const [messages, setMessages] = useState<Array<FlashMessage>>([]);

    useEffect(() => {
        setUpdateFlashes(setMessages);
        return () => deleteAll();
    }, [setMessages]);

    return (
        messages.length > 0 &&
            messages.map(function(msg: FlashMessage, i) {
                return (
                    <FlashAlert key={msg.id} type={msg.type} deleteMsg={msg.deleteFlash}>
                        {msg.data}
                    </FlashAlert>
                )
            }) 
    );
}