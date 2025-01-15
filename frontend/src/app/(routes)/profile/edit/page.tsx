import { refreshToken } from "@/api/server/auth"
import { getUserProfile } from "@/api/server/profile";
import Layout from "@/components/Layout/Layout";
import EditProfile from "@/features/profile/components/editprofile/EditProfile";

export const metadata = {
    title: "Woork - Edita tu perfil"
}

export default async function Page() {
    const accessToken = await refreshToken();
    const profile = await getUserProfile(accessToken);

    const editInformation = {
        about: profile.publicProfile.about,
        categories: profile.publicProfile.categories
    }

    return (
        <Layout>
            <EditProfile editInformation={editInformation} />
        </Layout>
    )
}