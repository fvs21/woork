"use client"

import { switchTheme } from "./actions";
import { ThemeContext } from "./ThemeContext";
import { useState } from "react";

export default function ThemeProvider({initialTheme, children}) {
    const [theme, setTheme] = useState(initialTheme);
    //come back later

    const changeTheme = async (val) => {
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.toggle(val);
        setTheme(val);
        await switchTheme(val);
    }

    return (
        <ThemeContext.Provider value={[theme, changeTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}