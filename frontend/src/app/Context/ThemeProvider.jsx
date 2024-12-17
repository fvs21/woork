"use client"

import { ThemeContext } from "./ThemeContext";
import { useLayoutEffect, useState } from "react";

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    useLayoutEffect(() => {
        const theme = localStorage.getItem('theme');
        
        if(theme == null) {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.toggle('light');
        }  else {
            document.documentElement.classList.toggle(theme);
        }
    }, []);

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