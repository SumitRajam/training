import { fetchUserDetails } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token_ShopTastic');

    if (!token) {
        console.error("No token found!");
        return;
    }

    function decodeJWT(token) {
        try {
            const payload = token.split('.')[1];
            return JSON.parse(atob(payload));
        } catch (error) {
            console.error("Invalid token format:", error);
            return null;
        }
    }

    const decodedData = decodeJWT(token);

    if (!decodedData) {
        console.error("Failed to decode token.");
        return;
    }

    try {
        let details = await fetchUserDetails(decodedData.sub);
        delete details.password;
        document.getElementById("username").textContent = details.username;
        document.getElementById("email").textContent = details.email;
        document.getElementById("fullName").textContent = `${details.name.firstname} ${details.name.lastname}`;
        document.getElementById("street").textContent = details.address.street;
        document.getElementById("city").textContent = details.address.city;
        document.getElementById("zipcode").textContent = details.address.zipcode;
        document.getElementById("phone").textContent = details.phone;

    } catch (error) {
        console.error("Error fetching user details:", error);
    }
});
