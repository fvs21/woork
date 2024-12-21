import Layout from "@/components/Layout/Layout";
import PostingView from "@/features/posting/PostingView";

export default async function Posting({params}) {
    const id = (await params).id;
    
    return (
        <Layout>
            <PostingView id={id} />
        </Layout>
    )
}