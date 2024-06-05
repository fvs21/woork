import styles from "../../components/ValidatedInput/ValidatedInput.module.scss"

export function determineInputColor({active, valid}) {
    if(!active && !valid) {
        return styles['error-border'];
    } else if(active && valid) {
        return styles['purple-border'];
    } else if(active && !valid) {
        return styles['error-border'];
    }

    return styles['normal-border'];
}

