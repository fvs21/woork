import CreatedPostingsListing from "@/features/postingsdashboard/CreatedPostingsListing";
import PostingsDashboardLayout from "@/features/postingsdashboard/PostingsDashboardLayout";

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