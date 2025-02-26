import axios from 'axios'
import { useQuery, useMutation } from "@tanstack/react-query";

const app = axios.create({
    baseURL: "https://fakestoreapi.com",
    headers: { "Content-Type": "application/json" }
});

// export const useProducts = () => {
//     return useQuery({
//         queryKey: ["products"],
//         queryFn: async () => {
//             const res = await app.get("/products");
//             console.log(res.data);
//             return res.data;
//         }
//     });
// };

export const useProducts = (category) => {
    return useQuery({
        queryKey: ["products", category],
        queryFn: async () => {
            const link = category === "all" ? "/products" : `/products/category/${category}`;
            try {
                const response = await app.get(link);
                return response.data;
            } catch (error) {
                console.error("Error fetching products:", error);
                return [];
            }
        }
    });
};