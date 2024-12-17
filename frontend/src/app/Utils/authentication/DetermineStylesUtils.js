import "@/styles/globals.scss";

export function determineInputColor(active, valid) {
    if(!active && !valid) {
        return 'error-border';
    } else if(active && valid) {
        return 'purple-border';
    } else if(active && !valid) {
        return 'purple-border';
    }

    return "";
}
