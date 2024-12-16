"use client";

import { getUser, refreshToken } from "@/api/authServer";
import { useAuth } from "@/api/hooks/authentication";
import { useQuery } from "react-query";

export default function AuthClient({accessToken, user, children}) {
    useQuery({
        initialData: user,
        queryFn: async () => getUser(accessToken),
        queryKey: ['user-info'],
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });

    useQuery({
        initialData: accessToken,
        queryFn: refreshToken(),
        queryKey: ['access-token'],
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });

    const token = useAuth();
    
    

    return children;
}