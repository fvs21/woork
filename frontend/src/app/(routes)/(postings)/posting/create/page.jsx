import CreatePostingForm from "@/features/createposting/CreatePostingForm"
import Layout from "@/components/Layout/Layout"
import { refreshToken } from "@/api/server/auth"
import { getAddedAddresses } from "@/api/server/postings";

export const metadata = {
    title: "Woork - Crear anuncio"
}

export default async function Page() {
    const accessToken = await refreshToken();
    const addedAddresses = await getAddedAddresses(accessToken);

    return (
        <Layout>
            <div style={{backgroundColor: "var(--card-bg)"}}>
                <CreatePostingForm />
            </div>
        </Layout>
    )
}