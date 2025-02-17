const API_URL = "https://fakestoreapi.com";

export interface Product {
    id?: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
    rating?: { rate: number; count: number };
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

export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await axios.get<Product[]>(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}


export async function fetchUserDetails(userID: number): Promise<any> {
    try {
        const response = await axios.get(`${API_URL}/users/${userID}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
    }
}

export async function fetchByCategory(category: string): Promise<Product[]> {
    try {
        const response = await axios.get<Product[]>(`${API_URL}/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function fetchCart(cartId: number): Promise<Cart | null> {
    try {
        const response = await axios.get<Cart>(`${API_URL}/carts/${cartId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        return null;
    }
}

export async function updateCart(cartId: number, cartProducts: CartProduct[]): Promise<boolean> {
    try {
        const response = await axios.put(`${API_URL}/carts/${cartId}`, {
            date: new Date().toISOString().split("T")[0],
            products: cartProducts
        }, {
            headers: { "Content-Type": "application/json" }
        });

        window.alert(`Response status: ${response.status}\nCart updated successfully`);
        return true;
    } catch (error) {
        console.error("Error updating cart:", error);
        return false;
    }
}

export async function createCart(cartProducts: CartProduct[]): Promise<Cart | null> {
    try {
        const response = await axios.post<Cart>(`${API_URL}/carts`, {
            userId: 3,
            date: new Date().toISOString().split("T")[0],
            products: cartProducts
        }, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating cart:", error);
        return null;
    }
}

export async function updateCartQuantity(productId: number, change: number): Promise<void> {
    let cartProducts: CartProduct[] = JSON.parse(localStorage.getItem("cartProducts") || "[]");
    const productIndex = cartProducts.findIndex(item => item.productId === productId);

    if (productIndex !== -1) {
        cartProducts[productIndex].quantity += change;
        if (cartProducts[productIndex].quantity <= 0) {
            cartProducts.splice(productIndex, 1);
        }
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
}

export async function addProduct(product: Product): Promise<Product | null> {
    try {
        const response = await axios.post<Product>(`${API_URL}/products`, product);
        window.alert(`Response status: ${response.status}\nItem added successfully`);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        return null;
    }
}

export async function deleteProduct(productId: number): Promise<boolean> {
    try {
        const response = await axios.delete(`${API_URL}/products/${productId}`);
        window.alert(`Response status: ${response.status}\nItem deleted successfully`);
        return true;
    } catch (error) {
        console.error("Error deleting product:", error);
        return false;
    }
}
