import AccountPanel from "../components/accountpanel/AccountPanel"
import SecurityPanel from "@/features/dashboard/components/security/SecurityPanel"
import VerifyPanel from "@/features/dashboard/components/VerifyPanel/VerifyPanel"
import WorkPanel from "@/features/dashboard/components/workerRegistration/components/WorkPanel"

export function determineOptionPanel(option: number) {
    switch(option) {
        case 0:
        case -1:
            return <AccountPanel />
        case 1:
            return <VerifyPanel />
        case 2:
            return <WorkPanel />
        case 3:
            return <SecurityPanel />
    }
}