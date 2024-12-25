export type FlashMessage = {
    id: string,
    data: string,
    type: string,
    deleteFlash: Function
}

export type FlashMessageCreator = {
    flash: (message: string, timeout: number, type: string) => void,
    setUpdateFlashes: (func: FunctionConstructor) => void,
    deleteAll: () => void
}