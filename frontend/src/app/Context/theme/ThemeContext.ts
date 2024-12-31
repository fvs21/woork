import { createContext } from "react";

export type ThemeContext = ['dark' | 'light', Function];

export const ThemeContext = createContext<ThemeContext | []>([]);