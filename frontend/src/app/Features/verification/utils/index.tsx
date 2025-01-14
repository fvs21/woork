import VerificationFour from "../components/VerificationSteps/VerificationFour";
import VerificationOne from "../components/VerificationSteps/VerificationOne";
import VerificationThree from "../components/VerificationSteps/VerificationThree";
import VerificationTwo from "../components/VerificationSteps/VerificationTwo";

export function determineVerificationStep(step: number, setStep: (step: number) => void) {
    switch(step) {
        case 0:
            return <VerificationOne setStep={setStep}/>
        case 1:
            return <VerificationTwo setStep={setStep} />
        case 2:
            return <VerificationThree setStep={setStep} />
        case 3:
            return <VerificationFour />
    }
}