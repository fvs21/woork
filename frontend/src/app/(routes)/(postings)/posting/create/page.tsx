import CreatePostingForm from "@/features/createposting/CreatePostingForm"
import Layout from "@/components/Layout/Layout"

export const metadata = {
    title: "Woork - Crear anuncio"
}

export default async function Page() {
    return (
        <Layout>
            <div style={{backgroundColor: "var(--card-bg)"}}>
                <CreatePostingForm />
            </div>
        </Layout>
    )
}