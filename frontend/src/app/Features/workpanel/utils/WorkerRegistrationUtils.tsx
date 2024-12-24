import WorkerRegistrationOne from "../components/WorkerRegistration/WorkerRegistrationOne"
import WorkerRegistrationThree from "../components/WorkerRegistration/WorkerRegistrationThree"
import WorkerRegistrationTwo from "../components/WorkerRegistration/WorkerRegistrationTwo"

export const determineWorkerRegistrationModal = (step: number, setStep: Function) => {
    switch(step) {
        case 0: 
            return <WorkerRegistrationOne setStep={setStep} />
        case 1:
            return <WorkerRegistrationTwo setStep={setStep} />
        case 2:
            return <WorkerRegistrationThree setStep={setStep} />
    }
}