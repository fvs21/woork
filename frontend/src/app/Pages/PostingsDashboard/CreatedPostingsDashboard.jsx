import CreatedPostingsListing from "@/Features/PostingsDashboard/CreatedPostingsListing";
import PostingsDashboardLayout from "@/Features/PostingsDashboard/PostingsDashboardLayout";
import { flash } from "@/flash-message/flashMessageCreator";
import { useEffect } from "react";

export default function CreatedPostingsDashboard({flash: f, postings}) {
    const { message } = f || "";

    useEffect(() => {
        if(message)
            flash(message, 3000);
    }, [message]);
    
    return (
        <PostingsDashboardLayout option={1}>
            <CreatedPostingsListing postings={postings.data}/>
        </PostingsDashboardLayout>
    )
}