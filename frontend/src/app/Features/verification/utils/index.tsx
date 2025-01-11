import VerificationOne from "../components/VerificationSteps/VerificationOne";

export function determineVerificationStep(step: number) {
    switch(step) {
        case 0:
            return <VerificationOne />
    }
}