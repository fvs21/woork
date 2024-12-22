import PendingJobs from "@/features/postingsdashboard/PendingJobs";
import PostingsDashboardLayout from "@/features/postingsdashboard/PostingsDashboardLayout";

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