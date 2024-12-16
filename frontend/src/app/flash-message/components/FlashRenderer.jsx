import { useState } from "react";
import { setUpdateFlashes, deleteAll } from "../flashMessageCreator";
import { useEffect } from "react";
import FlashAlert from "@/Components/FlashAlert/FlashAlert";

export default function FlashRenderer() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setUpdateFlashes(setMessages);
        return () => deleteAll();
    }, [setMessages]);

    return (
        messages.length > 0 &&
            messages.map(function(msg, i) {
                return <FlashAlert key={msg.id} type={msg.type} deleteMsg={msg.deleteFlash}>
                    {msg.data}
                </FlashAlert>
            }) 
    );
}