import axios from "axios";

export async function registerUser(body) {
    try {
        const response = await axios.post(
            'http://localhost:8000/auth/register', 
            body
        );
        return response;
    } catch(error) {
        return error;
    }
}