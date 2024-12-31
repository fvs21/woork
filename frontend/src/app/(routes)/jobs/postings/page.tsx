import CreatedPostingsListing from "@/features/postingsdashboard/components/CreatedPostings/CreatedPostingsListing";
import PostingsDashboardLayout from "@/features/postingsdashboard/components/PostingsDashboard/PostingsDashboardLayout";

export const metadata = {
    title: "Woork - Tus anuncios"
}

export default function Page() {
    return (
        <PostingsDashboardLayout option={1}>
            <CreatedPostingsListing />
        </PostingsDashboardLayout>
    )
}