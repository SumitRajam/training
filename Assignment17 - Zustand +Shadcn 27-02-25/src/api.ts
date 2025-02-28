import axios from 'axios'
import { useQuery, useMutation } from "@tanstack/react-query";
import useProductStore from "./store/productStore";


const app = axios.create({
    baseURL: "https://fakestoreapi.com",
    headers: { "Content-Type": "application/json" }
});

export const useProducts = (category: string) => {
    const { setProducts } = useProductStore();
    const storedData = localStorage.getItem("productStore");
    const parsedData = storedData ? JSON.parse(storedData) : null;
    const skip = parsedData && category === "all";

    const query = useQuery({
        queryKey: ["products", category],
        queryFn: async () => {
            const link = category === "all" ? "/products" : `/products/category/${category}`;
            try {
                const response = await app.get(link);
                if (category === "all") setProducts(response.data);
                return response.data;
            } catch (error) {
                console.error("Error fetching products:", error);
                throw new Error("Failed to fetch products");
            }
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });

    return skip
        ? { data: parsedData?.state?.products || [], isLoading: false, error: null }
        : query;
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

export const useLogin = (username: string, password: string) => {
    return useMutation({
        mutationFn: async () => {
            try {
                const response = await axios.post("https://fakestoreapi.com/auth/login", {
                    username: username,
                    password: password
                });
                return response.data;
            } catch (error) {
                console.error("Error fetching user details:", error);
                return null;
            }
        },
    });
}

export const fetchUserDetails = (userID: number) => {
    useMutation({
        mutationFn: async () => {
            try {
                const response = await app.get(`/users/${userID}`);
                return response.data;
            } catch (error) {
                console.error("Error fetching user details:", error);
                return null;
            }
        },
    })
}

export const useCreateCart = () => {
    return useMutation({
        mutationFn: async (cartProducts: { productId: number; quantity: number }[]) => {
            try {
                const response = await app.post("/carts", {
                    userId: 2,
                    date: new Date().toISOString().split('T')[0],
                    products: cartProducts
                });

                return response.data;
            } catch (error) {
                console.error("Error creating cart:", error);
                throw new Error("Failed to create cart");
            }
        }
    });
};

export const useUpdateCart = () => {
    return useMutation({
        mutationFn: async ({ cartId, updatedProducts }: { cartId: number; updatedProducts: { productId: number; quantity: number }[] }) => {
            try {
                const response = await app.put(`/carts/${cartId}`, {
                    userId: 2,
                    date: new Date(),
                    products: updatedProducts
                });

                return response.data;
            } catch (error) {
                console.error("Error updating cart:", error);
                throw new Error("Failed to update cart");
            }
        }
    });
};