import { updateCartQuantity, fetchProducts, fetchCart, updateCart } from "./api.js";

interface Product {
    id: number;
    title: string;
    price: number;
}

interface CartItem {
    productId: number;
    quantity: number;
}

declare global {
    interface Window {
        clearCart: () => void;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    let cartProducts: CartItem[] = JSON.parse(localStorage.getItem("cartProducts") || "[]");

    async function loadCart(): Promise<void> {
        try {
            const storedItems: Product[] = JSON.parse(localStorage.getItem("items") || "[]");
            const cartItemsContainer = document.getElementById("cart-items") as HTMLTableElement;
            const totalCostElement = document.getElementById("total-cost") as HTMLElement;

            cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
            let totalCost = 0;
            cartItemsContainer.innerHTML = "";

            if (cartProducts.length === 0) {
                cartItemsContainer.innerHTML = `<tr><td colspan="5" class="text-center">Your cart is empty.</td></tr>`;
                if (totalCostElement) totalCostElement.textContent = "";
                return;
            }

            cartProducts.forEach((cartItem: CartItem) => {
                const product = storedItems.find(item => item.id === cartItem.productId);
                if (!product) return;

                const productTotal = product.price * cartItem.quantity;
                totalCost += productTotal;

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${product.title}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${cartItem.quantity}</td>
                    <td>$${productTotal.toFixed(2)}</td>
                    <td>
                       <button class="btn btn-sm btn-success" id="plus-${cartItem.productId}">+</button>
                       <button class="btn btn-sm btn-danger" id="minus-${cartItem.productId}">-</button>
                    </td>
                `;

                cartItemsContainer.appendChild(row);
            });

            if (totalCostElement) totalCostElement.textContent = `${totalCost.toFixed(2)}`;
        } catch (error) {
            console.error("Error loading cart:", error);
        }
    }

    const changeQuantity = async (productId: number, change: number): Promise<void> => {
        await updateCartQuantity(productId, change);
        loadCart();
    };

    const cartTable = document.getElementById("cart-table");
    if (cartTable) {
        cartTable.addEventListener("click", (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "BUTTON") {
                const buttonId = target.id;
                const [action, productId] = buttonId.split("-");

                if (action === "plus") {
                    changeQuantity(parseInt(productId), 1);
                } else if (action === "minus") {
                    changeQuantity(parseInt(productId), -1);
                }
            }
        });
    }

    const checkoutButton = document.getElementById("proceed-checkout");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            const cartId = parseInt(localStorage.getItem("cartID") || "0");
            cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
            updateCart(cartId, cartProducts);
        });
    }



    window.clearCart = function (): void {
        localStorage.removeItem("cartProducts");
        loadCart();
    };

    loadCart();
});
