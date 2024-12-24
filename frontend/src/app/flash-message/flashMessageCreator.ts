import { FlashMessage, FlashMessageCreator } from "./types/flashMessagesTypes";

type SetMessagesFunction = undefined | Function;

const { flash, setUpdateFlashes, deleteAll }: FlashMessageCreator = (function() {
    const flashes = new Map();
    let updateMessages: SetMessagesFunction = Function || undefined;

    function setUpdateFlashes(func: FunctionConstructor) {
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

    function createFlashMessage(message: string, timeout = 3000, type: string) {
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