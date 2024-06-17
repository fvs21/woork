import { axiosPrivate } from "../api/axios";
import { useEffect, useState } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { useAuth } from "./useAuth";

export function useAxiosPrivate() {
    const refresh = useRefreshToken();
    const [sent, setSent] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async (request) => {
                if(!auth?.access_token && !sent) {
                    setSent(true);
                    const newAccessToken = await refresh();
                    request.headers['Authorization'] = `Bearer ${newAccessToken}`;    
                }
                if(!request.headers['Authorization']) {
                    request.headers['Authorization'] = `Bearer ${auth?.access_token}`;
                }
                return request;
            }, (error) => Promise.reject(error)
        ); 
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async(error) => {
                const prevRequest = error?.config;
                const EXPIRED_ACCESS_TOKEN_MSG = "Expired access token."; //change it
                
                if(error?.response?.status === 401 && !prevRequest?.sent && error.response.data === EXPIRED_ACCESS_TOKEN_MSG) { 
                    prevRequest.sent = true;
                    const {newAccessToken} = await refresh();
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