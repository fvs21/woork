import Dashboard from '@/features/dashboard/components/Dashboard';
import DashboardContext from '@/features/dashboard/context/ContextProvider';

export const metadata = {
    title: "Woork - Cuenta"
}

export default function Page() {
    return (
        <DashboardContext>
            <Dashboard />
        </DashboardContext>
    )
}
