import { fetchUserDetails } from './api.js';

interface UserDetails {
    username: string;
    email: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        street: string;
        city: string;
        zipcode: string;
    };
    phone: string;
}

interface DecodedToken {
    sub: string;
}

document.addEventListener("DOMContentLoaded", async () => {
    const token: string | null = localStorage.getItem('token_ShopTastic');

    if (!token) {
        console.error("No token found!");
        return;
    }

    function decodeJWT(token: string): DecodedToken | null {
        try {
            const payload = token.split('.')[1];
            return JSON.parse(atob(payload)) as DecodedToken;
        } catch (error) {
            console.error("Invalid token format:", error);
            return null;
        }
    }

    const decodedData: DecodedToken | null = decodeJWT(token);

    if (!decodedData) {
        console.error("Failed to decode token.");
        return;
    }

    try {
        let details: UserDetails = await fetchUserDetails(Number(decodedData.sub));

        delete (details as any).password;

        function setTextContent(id: string, text: string) {
            const element = document.getElementById(id);
            if (element) element.textContent = text;
        }

        setTextContent("username", details.username);
        setTextContent("email", details.email);
        setTextContent("fullName", `${details.name.firstname} ${details.name.lastname}`);
        setTextContent("street", details.address.street);
        setTextContent("city", details.address.city);
        setTextContent("zipcode", details.address.zipcode);
        setTextContent("phone", details.phone);

    } catch (error) {
        console.error("Error fetching user details:", error);
    }
});
