import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from '../../api/axios'

export async function registerUser(body) {
    const response = await axios.post(body);
    
    if(response.status != 200)   {
        throw new Error(response.status, response.data);
    }
}