import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const api = axios.create({
    baseURL: "https://fakestoreapi.com",
    headers: { "Content-Type": "application/json" }
});

export interface Product {
    id?: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating?: { rate: number, count: number }
    quantity?: number | 0;
}

export interface UserDetails {
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

interface CartProduct {
    productId: number;
    quantity: number;
}

interface Cart {
    id?: number;
    userId: number;
    date: string;
    products: CartProduct[];
}

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get<Product[]>("/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const fetchUserDetails = async (userID: number): Promise<any> => {
    try {
        const response = await api.get(`/users/${userID}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
    }
};

export const fetchByCategory = async (category: string): Promise<Product[]> => {
    try {
        const response = await api.get<Product[]>(`/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const fetchCart = async (cartId: number): Promise<Cart | null> => {
    try {
        const response = await api.get<Cart>(`/carts/${cartId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        return null;
    }
};


export const createCart = async (cartProducts: CartProduct[]): Promise<Cart | null> => {
    try {
        const response = await api.post<Cart>("/carts", {
            userId: 3,
            date: new Date().toISOString().split("T")[0],
            products: cartProducts
        });
        return response.data;
    } catch (error) {
        console.error("Error creating cart:", error);
        return null;
    }
};

export const updateCart = async (cartId: number, cartProducts: CartProduct[]): Promise<boolean> => {
    try {
        const response = await api.put(`/carts/${cartId}`, {
            date: new Date(),
            products: cartProducts
        });

        window.alert(`Response status: ${response.status}\nCart updated successfully`);
        return true;
    } catch (error) {
        console.error("Error updating cart:", error);
        return false;
    }
};

export const addProduct = () => {
    return useMutation({
        mutationFn: async (product: Product): Promise<Product | null> => {
            const response = await api.post<Product>("/products", product);
            window.alert(`Response status: ${response.status}\nItem added successfully`);
            return response.data;
        },
        onError: (error) => {
            console.error("Error adding product:", error);
        }
    });
};


export const deleteProduct = async (productId: number): Promise<boolean> => {
    try {
        const response = await api.delete(`/products/${productId}`);
        window.alert(`Response status: ${response.status}\nItem deleted successfully`);
        return true;
    } catch (error) {
        console.error("Error deleting product:", error);
        return false;
    }
};

export async function fetchUserCart(sub: number): Promise<CartProduct[]> {
    try {
        const response = await api.get<Cart[]>(`/carts/user/${sub}`);
        return response.data.reduce<CartProduct[]>((acc, cart) => [...acc, ...cart.products], []);
    } catch (error) {
        console.error("Error fetching user cart:", error);
        return [];
    }
}

export const fetchProductDetails = async (productId: number) => {
    try {
        const response = await api.get(`/products/${productId}`);
        if (response.status !== 200 || !response.data) {
            throw new Error(`Failed to fetch product details for ID: ${productId}`);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
};