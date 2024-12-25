import Layout from "@/components/Layout/Layout"
import LeftMessagesTab from "@/features/messages/components/LeftMessagesTab/LeftMessagesTab"
import MainMessagesSection from "@/features/messages/components/MainMessagesSection/MainMessagesSection"

export const metadata = {
    title: "Woork - Tus mensajes"
}

export default function Page() {
    return (
        <Layout>
            <MainMessagesSection>
                <LeftMessagesTab />
            </MainMessagesSection>
        </Layout>
    )
}