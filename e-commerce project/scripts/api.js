const API_URL = "https://fakestoreapi.com";

async function fetchProducts() {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

async function fetchByCategory(category) {
    try {
        const response = await axios.get(`${API_URL}/products/${category}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

async function fetchCart(cartId) {
    try {
        const response = await fetch(`${API_URL}/carts/${cartId}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching cart:", error);
        return null;
    }
}

async function updateCart(cartId, cartProducts) {
    try {
        await fetch(`${API_URL}/carts/${cartId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 3,
                date: new Date().toISOString().split("T")[0],
                products: cartProducts
            })
        });
        console.log(response.json());
        return true;
    } catch (error) {
        console.error("Error updating cart:", error);
        return false;
    }
}

async function createCart(cartProducts) {
    try {
        const response = await fetch(`${API_URL}/carts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: 3,
                date: new Date().toISOString().split("T")[0],
                products: cartProducts
            })
        });

        return await response.json();
    } catch (error) {
        console.error("Error creating cart:", error);
        return null;
    }
}

export async function updateCartQuantity(productId, change) {
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

    const productIndex = cartProducts.findIndex(item => item.productId === productId);
    console.log(productIndex);
    if (productIndex !== -1) {
        cartProducts[productIndex].quantity += change;
        if (cartProducts[productIndex].quantity <= 0) {
            cartProducts.splice(productIndex, 1);
        }

        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
}

export { fetchProducts, fetchCart, updateCart, createCart };
