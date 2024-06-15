import axios from '../api/axios';
import { useAuth } from './useAuth'

export function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh');
        setAuth(prev => {
            return {...prev, access_token: response.data};
        });
        return response.data;
    }

    return refresh;
}