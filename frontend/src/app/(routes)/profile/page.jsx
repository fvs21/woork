import { refreshToken } from "@/api/server/auth";
import { getProfile } from "@/api/server/profile";
import Layout from "@/components/Layout/Layout";
import ProfileViewer from "@/features/profile/ProfileViewer";

export const metadata = {
    title: "Woork - Tu perfil"
}

export default async function Page() {
    const accessToken = await refreshToken();
    const profile = await getProfile(accessToken);

    return (
        <Layout>
            <ProfileViewer profile={profile.publicProfile} isUsersAccount={profile.isUsersAccount} />
        </Layout>
    )
}