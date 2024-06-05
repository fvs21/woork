import RegisterForm from "./RegisterForm";
import PhoneVerification from '../PhoneVerification/PhoneVerification';

export default function RegistrationStepCounter({step, setStep}) {
    switch(step) {
        case 0:
            return <RegisterForm setStep={setStep} />
        case 1:
            return <PhoneVerification />
    }
}