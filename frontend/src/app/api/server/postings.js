export const getAddedAddresses = async (accessToken) => {
    try {
        const data = await fetch("http://localhost:8000/api/posting/addresses", {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken?.access_token}`
            },
        });

        const json = await data.json();

        return json;
    } catch(error) {
        return [];
    }
}