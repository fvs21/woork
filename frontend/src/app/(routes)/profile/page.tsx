import { refreshToken } from "@/api/server/auth";
import { getUserProfile } from "@/api/server/profile";
import Layout from "@/components/Layout/Layout";
import ProfileViewer from "@/features/profile/components/ProfileViewer/ProfileViewer";

export const metadata = {
    title: "Woork - Tu perfil"
}

export default async function Page() {
    const accessToken = await refreshToken();
    const profile = await getUserProfile(accessToken);

    return (
        <Layout>
            <ProfileViewer 
                profile={profile.publicProfile} 
                isUsersAccount={profile.isUsersAccount} 
            />
        </Layout>
    )
}