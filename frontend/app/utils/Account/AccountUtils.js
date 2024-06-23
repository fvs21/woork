import InformationPanel from "../../features/InformationPanel/InformationPanel";
import SecurityPanel from "../../features/SecurityPanel/SecurityPanel";

export function determineOptionPanel(option) {
    switch(option) {
        case 0:
            return <InformationPanel />
        case 1:
            return <SecurityPanel />
        case 2: 
            return <h1>W.I.P.</h1>
    }
}

export function checkIfValidImage(file) {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    return validTypes.includes(file.type);
}

export const defaultPfpUrl = "http://localhost:8000/api/images/default-pfp";