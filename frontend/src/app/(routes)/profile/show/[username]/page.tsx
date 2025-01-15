import { refreshToken } from "@/api/server/auth";
import { searchProfile } from "@/api/server/profile";
import Layout from "@/components/Layout/Layout";
import ProfileViewer from "@/features/profile/components/ProfileViewer/ProfileViewer";
import { PublicProfile, PublicWorkerProfile } from "@/features/profile/types";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({ params }) {
    const username: string = (await params).username;
    const accessToken = await refreshToken();
    const profile = await searchProfile(username, accessToken);
    
    if(profile.error)
        notFound();
    
    if(profile.isUsersAccount)
        redirect("/profile");

    return {
        title: `Woork - Perfil de ${profile.publicProfile.firstName}`
    }
}

export default async function Page({ params }) {
    //requests should be memoized
    const username = (await params).username;
    const accessToken = await refreshToken();
    const profile = await searchProfile(username, accessToken);

    if(profile.error)
        notFound();

    const publicProfile = profile.publicProfile;
    
    return (
        <Layout>
            <ProfileViewer 
                profile={publicProfile.is_worker ? publicProfile as PublicWorkerProfile : publicProfile as PublicProfile} 
                isUsersAccount={false} />
        </Layout>
    )
}