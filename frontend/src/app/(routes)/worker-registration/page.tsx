import { getUser, refreshToken } from '@/api/server/auth';
import Layout from '@/components/Layout/Layout';
import CriminalRecordsView from '@/features/verification/components/CriminalRecords/CriminalRecordsView';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Woork - Registro'
}

export default async function Page() {
    const accessToken = await refreshToken();
    const user = await getUser(accessToken);

    if(user.is_worker) {
        redirect("/dashboard");
    }

    return (
        <Layout>
            <CriminalRecordsView />
        </Layout>
    );
}