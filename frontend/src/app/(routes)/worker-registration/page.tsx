import Layout from '@/components/Layout/Layout';
import CriminalRecordsView from '@/features/verification/components/CriminalRecords/CriminalRecordsView';

export const metadata = {
    title: 'Woork - Registro'
}

export default function Page() {
    return (
        <Layout>
            <CriminalRecordsView />
        </Layout>
    );
}