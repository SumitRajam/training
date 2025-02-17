var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchUserDetails } from './api.js';
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem('token_ShopTastic');
    if (!token) {
        console.error("No token found!");
        return;
    }
    function decodeJWT(token) {
        try {
            const payload = token.split('.')[1];
            return JSON.parse(atob(payload));
        }
        catch (error) {
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
        let details = yield fetchUserDetails(Number(decodedData.sub));
        delete details.password;
        function setTextContent(id, text) {
            const element = document.getElementById(id);
            if (element)
                element.textContent = text;
        }
        setTextContent("username", details.username);
        setTextContent("email", details.email);
        setTextContent("fullName", `${details.name.firstname} ${details.name.lastname}`);
        setTextContent("street", details.address.street);
        setTextContent("city", details.address.city);
        setTextContent("zipcode", details.address.zipcode);
        setTextContent("phone", details.phone);
    }
    catch (error) {
        console.error("Error fetching user details:", error);
    }
}));
