import { Dispatch, SetStateAction } from "react";
import { FlashMessage, FlashMessageCreator } from "./types/flashMessagesTypes";

type SetMessagesFunction = undefined | Dispatch<SetStateAction<FlashMessage[]>>;

const { flash, setUpdateFlashes, deleteAll }: FlashMessageCreator = (function() {
    const flashes = new Map();
    let updateMessages: SetMessagesFunction = undefined;

    function setUpdateFlashes(func: Dispatch<SetStateAction<FlashMessage[]>>) {
        updateMessages = func;
    }

    function updateChanges() {
        if(updateMessages) {
            let messages: Array<FlashMessage> = [];
            flashes.forEach((m) => {
                messages.push({...m, deleteFlash: m.deleteFlash.bind(m), type: m.type});
            });
            updateMessages(messages);
        }
    }

    function createFlashMessage(message: string, timeout = 3000, type: 'success' | 'error') {
        const currentTime = new Date().getTime();
        const id = currentTime + "-" + Object.keys(flashes).length;

        const flash: FlashMessage = {
            id: id,
            data: message, 
            type: type,
            deleteFlash() {
                flashes.delete(this.id);
                updateChanges();
            }
        }

        setTimeout(() => {
            flash.deleteFlash();
        }, timeout);

        flashes.set(id, flash);
        updateChanges();
    }

    function deleteAllMessages() {
        flashes.clear();
        updateChanges();
    }

    return {
        flash: createFlashMessage,
        setUpdateFlashes,
        deleteAll: deleteAllMessages
    }
})();

export {
    flash,
    setUpdateFlashes,
    deleteAll
}