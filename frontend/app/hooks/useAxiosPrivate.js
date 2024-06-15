import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { useAuth } from "./useAuth";


export function useAxiosPrivate() {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async (config) => {
                if(!auth?.access_token) {
                    const newAccessToken = await refresh();
                    config.headers['Authorization'] = `Bearer ${newAccessToken.access_token}`; 
                }
                if(!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.access_token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        ); 
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async(error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);

        }
    }, [auth, refresh])

    return axiosPrivate;
}