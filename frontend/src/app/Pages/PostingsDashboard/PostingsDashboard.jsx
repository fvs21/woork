import PendingJobs from "@/Features/PostingsDashboard/PendingJobs";
import PostingsDashboardLayout from "@/Features/PostingsDashboard/PostingsDashboardLayout";

export default function PostingsDasboard() {
    return (
        <PostingsDashboardLayout option={0}>
            <PendingJobs />
        </PostingsDashboardLayout>
    );
}
