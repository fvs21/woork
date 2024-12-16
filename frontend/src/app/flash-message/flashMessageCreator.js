const { flash, setUpdateFlashes, deleteAll } = (function() {
    const flashes = new Map();
    let updateMessages = Function | undefined;

    function setUpdateFlashes(func) {
        updateMessages = func;
    }

    function updateChanges() {
        if(updateMessages) {
            let messages = [];
            flashes.forEach((m) => {
                messages.push({...m, deleteFlash: m.deleteFlash.bind(m), type: m.type});
            });
            updateMessages(messages);
        }
    }

    function createFlashMessage(message, timeout = 3000, type) {
        const currentTime = new Date().getTime();
        const id = currentTime + "-" + Object.keys(flashes).length;

        const flash = {
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