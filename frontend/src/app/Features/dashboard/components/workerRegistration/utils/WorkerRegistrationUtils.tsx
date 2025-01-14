import ArrowRightSVG from "@/components/SVGs/ArrowRight"
import WorkerRegistrationOne from "../components/WorkerRegistration/WorkerRegistrationOne"
import WorkerRegistrationThree from "../components/WorkerRegistration/WorkerRegistrationThree"
import WorkerRegistrationTwo from "../components/WorkerRegistration/WorkerRegistrationTwo"
import Checkmark from "@/components/SVGs/Checkmark"
import CloseSVG from "@/components/SVGs/Close"
import Clock from "@/components/SVGs/Clock"

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
        case 'NOT_SUBMITTED':
            return <ArrowRightSVG width={"20px"} color={"var(--text-color)"} />
        case 'SUBMITTED':
            return <Clock width="20px" color={"var(--text-color)"} />
        case 'APPROVED': 
            return <Checkmark width="20px" color={"green"} />
        case 'REJECTED':
            return <CloseSVG width="20px" color="red" />
    }
}