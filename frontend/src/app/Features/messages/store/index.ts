import { atom, useAtom } from "jotai";
import { SelectedChat } from "../types";

const selectedChatAtom = atom<SelectedChat>();

export const useSelectedChat = () => {
    return useAtom(selectedChatAtom);
}