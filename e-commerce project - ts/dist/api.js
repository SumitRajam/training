var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "https://fakestoreapi.com";
export function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`${API_URL}/products`);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    });
}
export function fetchUserDetails(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`${API_URL}/users/${userID}`);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching user details:", error);
            return null;
        }
    });
}
export function fetchByCategory(category) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`${API_URL}/products/category/${category}`);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    });
}
export function fetchCart(cartId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`${API_URL}/carts/${cartId}`);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching cart:", error);
            return null;
        }
    });
}
export function updateCart(cartId, cartProducts) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.put(`${API_URL}/carts/${cartId}`, {
                date: new Date().toISOString().split("T")[0],
                products: cartProducts
            }, {
                headers: { "Content-Type": "application/json" }
            });
            window.alert(`Response status: ${response.status}\nCart updated successfully`);
            return true;
        }
        catch (error) {
            console.error("Error updating cart:", error);
            return false;
        }
    });
}
export function createCart(cartProducts) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.post(`${API_URL}/carts`, {
                userId: 3,
                date: new Date().toISOString().split("T")[0],
                products: cartProducts
            }, {
                headers: { "Content-Type": "application/json" }
            });
            return response.data;
        }
        catch (error) {
            console.error("Error creating cart:", error);
            return null;
        }
    });
}
export function updateCartQuantity(productId, change) {
    return __awaiter(this, void 0, void 0, function* () {
        let cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
        const productIndex = cartProducts.findIndex(item => item.productId === productId);
        if (productIndex !== -1) {
            cartProducts[productIndex].quantity += change;
            if (cartProducts[productIndex].quantity <= 0) {
                cartProducts.splice(productIndex, 1);
            }
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        }
    });
}
export function addProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.post(`${API_URL}/products`, product);
            window.alert(`Response status: ${response.status}\nItem added successfully`);
            return response.data;
        }
        catch (error) {
            console.error("Error adding product:", error);
            return null;
        }
    });
}
export function deleteProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.delete(`${API_URL}/products/${productId}`);
            window.alert(`Response status: ${response.status}\nItem deleted successfully`);
            return true;
        }
        catch (error) {
            console.error("Error deleting product:", error);
            return false;
        }
    });
}
