import { useTheme } from "@/Hooks/theme";

export const svgColor = () => {
    const [theme] = useTheme();
    return theme == 'dark' ? 'white' : 'black';
}