import { atom, useAtom } from "jotai";
import { SelectedChat } from "../types";
import { Client } from "stompjs";

const selectedChatAtom = atom<SelectedChat>();

const stompClient = atom<Client>();

export const useSelectedChat = () => {
    return useAtom(selectedChatAtom);
}

export const useStompClient = () => {
    return useAtom(stompClient);
}