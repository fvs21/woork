"use client";

import { api, apiMultipart } from "@/api/axios";
import { fetchUser, refresh, useAuth } from "@/api/hooks/authentication";
import { User } from "@/types/global";
import React, { useLayoutEffect } from "react";
import { useQuery } from "react-query";

type AuthClientProps = {
    accessToken: string;
    user: User;
    children: React.ReactNode;
}

export default function AuthClient({accessToken, user, children}: AuthClientProps) {
    useQuery({
        initialData: accessToken || null,
        queryFn: () => refresh(),
        queryKey: ['access-token'],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    useQuery({
        initialData: user,
        queryFn: () => fetchUser(),
        queryKey: ['user-info'],
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });

    const [token, setToken] = useAuth();
    
    useLayoutEffect(() => {
        const interceptor = api.interceptors.request.use(
            (config) => {
                config.headers.Authorization = !config['_retry'] && token ? `Bearer ${token}` : config.headers.Authorization;
                return config;
            }
        );

        const interceptorMulti = apiMultipart.interceptors.request.use(
            (config) => {
                config.headers.Authorization = !config['_retry'] && token ? `Bearer ${token}` : config.headers.Authorization;
                return config;
            }
        );

        return () => {
            api.interceptors.request.eject(interceptor);
            apiMultipart.interceptors.request.eject(interceptorMulti);
        };
    }, [token]);

    useLayoutEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const original = error.config;

                if(error.response.status === 401 && error.response.data.message === 'Unauthorized') {
                    try {
                        const response = await refresh();
                        setToken(response);

                        original.headers.Authorization = `Bearer ${response}`;
                        original._retry = true;

                        return api(original);
                    } catch {
                        setToken(null);
                    }
                }
                return Promise.reject(error);
            }
        );

        const interceptorMulti = apiMultipart.interceptors.response.use(
            (response) => response,
            async (error) => {
                const original = error.config;

                if(error.response.status === 401 && error.response.data.message === 'Unauthorized') {
                    try {
                        const response = await refresh();
                        setToken(response);

                        original.headers.Authorization = `Bearer ${response}`;
                        original._retry = true;

                        return apiMultipart(original);
                    } catch {
                        setToken(null);
                    }
                }
                return Promise.reject(error);
            }
        )

        return () => {
            api.interceptors.response.eject(interceptor);
            apiMultipart.interceptors.response.eject(interceptorMulti);
        };
    }, []);

    return children;
}