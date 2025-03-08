import axios from 'axios'
import { useQuery, useMutation } from "@tanstack/react-query";

const app = axios.create({
    baseURL: "https://json-placeholder.mock.beeceptor.com",
    headers: { "Content-Type": "application/json" }
});

export const useLogin = () => {
    return useMutation({
        mutationFn: async ({ username, password }) => {
            try {
                const response = await app.post("/login", { username, password });
                return response.data; // Ensure response contains the token
            } catch (error) {
                console.error("Login failed:", error.response?.data || error.message);
                throw new Error(error.response?.data?.message || "Login failed");
            }
        },
    });
};