import PendingJobs from "@/features/postingsdashboard/PendingJobs";
import PostingsDashboardLayout from "@/features/postingsdashboard/PostingsDashboardLayout";

export default function PostingsDasboard() {
    return (
        <PostingsDashboardLayout option={0}>
            <PendingJobs />
        </PostingsDashboardLayout>
    );
}
