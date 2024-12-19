const BASE_URL = "http://localhost:8000/api";

export const getUserProfile = async (accessToken) => {
    try {
        const data = await fetch("http://localhost:8000/api/profile", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken?.access_token}`
            }
        });

        const json = await data.json();
        return json;
    } catch {
        return null;
    }
}

export const searchProfile = async (username, accessToken) => {
    try {
        const data = await fetch(`${BASE_URL}/profile/show/${username}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken?.access_token}`
            }
        });
        const json = await data.json();
        return json;
    } catch {
        return null;
    }
}