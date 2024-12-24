import PendingJobs from "@/features/postingsdashboard/components/PendingJobs/PendingJobs";
import PostingsDashboardLayout from "@/features/postingsdashboard/components/PostingsDashboard/PostingsDashboardLayout";

export const metadata = {
    title: "Woork - Panel de publicacione"
}

export default function Page() {
    return (
        <PostingsDashboardLayout option={0}>
            <PendingJobs />
        </PostingsDashboardLayout>
    )
}