import axios from 'axios'
import { useQuery, useMutation } from "@tanstack/react-query";

const app = axios.create({
    baseURL: "https://fakestoreapi.com",
    headers: { "Content-Type": "application/json" }
});

export const useProducts = (category: string) => {
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
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });
};

export const useProductDetails = (id: number) => {
    return useQuery({
        queryKey: ["products", id],
        queryFn: async () => {
            try {
                const response = await app.get(`/products/${id}`);
                return response.data;
            } catch (error) {
                console.error(`Error fetching product with id ${id}`, error);
                return [];
            }
        },
        enabled: !!id,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
};

export const useCategory = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            try {
                const response = await app.get("/products/categories");
                return response.data;
            } catch (error) {
                console.error("Error fetching categories:", error);
                return [];
            }
        }
    });
}

export const postProduct = () => {
    return useMutation({
        mutationFn: async (newProduct) => {
            try {
                const response = await app.post("/products", newProduct);
                alert("Product added successfully" + "\n" + JSON.stringify(response.status) + `\n` + JSON.stringify(response.data));
                return response.data;
            } catch (error) {
                console.error("Error posting product:", error);
                throw error;
            }
        },
    });
};

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: async (id: number) => {
            try {
                const response = await app.delete(`/products/${id}`);
                alert("Product deleted successfully" + "\n" + JSON.stringify(response.status) + `\n` + JSON.stringify(response.data));
                return response.data;
            } catch (error) {
                console.error(`Error deleting product with id ${id}`, error);
                throw error;
            }
        },
    });
};