"use client";

import { api, apiMultipart } from "@/api/axios";
import { fetchUser, refresh, useAuth } from "@/api/hooks/authentication";
import { useLayoutEffect } from "react";
import { useQuery } from "react-query";

export default function AuthClient({accessToken, user, children}) {
    useQuery({
        initialData: accessToken?.access_token || null,
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
                config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
                return config;
            }
        );

        const interceptorMulti = apiMultipart.interceptors.request.use(
            (config) => {
                config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
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
                        setToken(response.access_token);

                        original.headers.Authorization = `Bearer ${response.access_token}`;
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
                        setToken(response.access_token);

                        original.headers.Authorization = `Bearer ${response.access_token}`;
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