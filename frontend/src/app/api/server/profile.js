export const getProfile = async (accessToken) => {
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