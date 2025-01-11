import VerificationOne from "../components/VerificationSteps/VerificationOne";
import VerificationTwo from "../components/VerificationSteps/VerificationTwo";

export function determineVerificationStep(step: number, setStep: (step: number) => void) {
    switch(step) {
        case 0:
            return <VerificationOne setStep={setStep}/>
        case 1:
            return <VerificationTwo setStep={setStep} />
    }
}