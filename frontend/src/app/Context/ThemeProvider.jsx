"use client"

import { ThemeContext } from "./ThemeContext";
import { useEffect, useState } from "react";

export default function ThemeProvider({children}) {
    useEffect(() => {
        if(!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'light');
        }  
    }, []);

    const [theme, setTheme] = useState("light");
    //come back later

    const changeTheme = (val) => {
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.toggle(val);
        localStorage.setItem('theme', val);
        setTheme(val);
    }

    return (
        <ThemeContext.Provider value={[theme, changeTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}