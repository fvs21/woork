import { useTheme } from "@/hooks/theme";

export const svgColor = () => {
    const [theme] = useTheme();
    return theme == 'dark' ? 'white' : 'black';
}