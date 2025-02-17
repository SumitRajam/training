var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { updateCartQuantity, updateCart } from "./api.js";
document.addEventListener("DOMContentLoaded", () => {
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
    function loadCart() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storedItems = JSON.parse(localStorage.getItem("items") || "[]");
                const cartItemsContainer = document.getElementById("cart-items");
                const totalCostElement = document.getElementById("total-cost");
                cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
                let totalCost = 0;
                cartItemsContainer.innerHTML = "";
                if (cartProducts.length === 0) {
                    cartItemsContainer.innerHTML = `<tr><td colspan="5" class="text-center">Your cart is empty.</td></tr>`;
                    if (totalCostElement)
                        totalCostElement.textContent = "";
                    return;
                }
                cartProducts.forEach((cartItem) => {
                    const product = storedItems.find(item => item.id === cartItem.productId);
                    if (!product)
                        return;
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
                if (totalCostElement)
                    totalCostElement.textContent = `${totalCost.toFixed(2)}`;
            }
            catch (error) {
                console.error("Error loading cart:", error);
            }
        });
    }
    const changeQuantity = (productId, change) => __awaiter(void 0, void 0, void 0, function* () {
        yield updateCartQuantity(productId, change);
        loadCart();
    });
    const cartTable = document.getElementById("cart-table");
    if (cartTable) {
        cartTable.addEventListener("click", (e) => {
            const target = e.target;
            if (target.tagName === "BUTTON") {
                const buttonId = target.id;
                const [action, productId] = buttonId.split("-");
                if (action === "plus") {
                    changeQuantity(parseInt(productId), 1);
                }
                else if (action === "minus") {
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
    window.clearCart = function () {
        localStorage.removeItem("cartProducts");
        loadCart();
    };
    loadCart();
});
