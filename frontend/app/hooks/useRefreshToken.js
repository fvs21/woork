import axios from '../api/axios';
import { useAuth } from './useAuth'

export function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = () => {
        const response = axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {...prev, access_token: response.data.access_token};
        });
        return response.data.access_token;
    }

    return refresh;
}