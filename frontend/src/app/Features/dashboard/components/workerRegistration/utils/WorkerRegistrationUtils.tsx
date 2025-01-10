import ArrowRightSVG from "@/components/SVGs/ArrowRight"
import WorkerRegistrationOne from "../components/WorkerRegistration/WorkerRegistrationOne"
import WorkerRegistrationThree from "../components/WorkerRegistration/WorkerRegistrationThree"
import WorkerRegistrationTwo from "../components/WorkerRegistration/WorkerRegistrationTwo"
import Checkmark from "@/components/SVGs/Checkmark"
import CloseSVG from "@/components/SVGs/Close"

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

export function determineSvgIconForRequirement(status: string) {
    switch(status) {
        case 'none':
            return <ArrowRightSVG width={"20px"} color={"var(--text-color)"} />
        case 'pending':
            return <></>
        case 'verified': 
            return <Checkmark width="20px" color={"green"} />
        case 'rejected':
            return <CloseSVG width="20px" color="red" />
    }
}