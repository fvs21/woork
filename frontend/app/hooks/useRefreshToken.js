import axios from '../api/axios';
import { useAuth } from './useAuth'
import { useQuery } from 'react-query';

export function useRefreshToken() {
    const { setAuth } = useAuth();

    /*
    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const response = await axios.get('/auth/refresh');
            return response.data;
        },
        onSuccess: (data) => {
            setAuth(prev => {
                return {...prev, access_token: data, loggedIn: true};
            });
        },
        retry: false,
        staleTime: 50000
    })
    return { data, isLoading };
    */

    const refresh = async () => {
        try {
            const response = await axios.get('/auth/refresh');
            setAuth(prev => {
                return {...prev, access_token: response.data, loggedIn: true};
            });
            return response.data;
        } catch(error) {
            console.log(error);
        }
    }

    return refresh;
}