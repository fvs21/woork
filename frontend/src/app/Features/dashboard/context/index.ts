import { SetStateAction } from "jotai";
import { createContext, Dispatch, useContext } from "react";

export const DashboardOptionContext = createContext<[number, Dispatch<SetStateAction<number>>]>([-1, () => {}]);

export const useDashboardOption = () => {
    return useContext(DashboardOptionContext);
}