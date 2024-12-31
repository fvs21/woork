import { useContext } from "react";
import { ThemeContext } from "@/context/theme/ThemeContext";

const transitionManager = () => {
    const style = document.createElement('style');
    const css = document.createTextNode(`* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
    }`);
    style.appendChild(css);

    const enable = () => document.head.removeChild(style);
    const disable = () => document.head.appendChild(style);

    return {enable, disable, style};
}

export const useTheme = (): ThemeContext => {
    const [theme, setTheme] = useContext(ThemeContext);

    const changeTheme = () => {
        const transitions = transitionManager();

        transitions.disable();

        setTheme(theme == 'dark' ? 'light' : 'dark');

        window.getComputedStyle(transitions.style).opacity;

        transitions.enable();
    }
    
    return [theme, changeTheme];
}