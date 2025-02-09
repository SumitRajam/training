import { updateCartQuantity, fetchProducts, fetchCart, updateCart } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    async function loadCart() {
        try {
            const storedItems = JSON.parse(localStorage.getItem("items")) || [];
            const cartItemsContainer = document.getElementById("cart-items");
            let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
            let totalCost = 0;
            cartItemsContainer.innerHTML = "";
            if (cartProducts.length === 0) {
                cartItemsContainer.innerHTML = `<tr><td colspan="5" class="text-center">Your cart is empty.</td></tr>`;
                document.getElementById("total-cost").textContent = "";
                return;
            }

            cartProducts.forEach(cartItem => {
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

            document.getElementById("total-cost").textContent = `${totalCost.toFixed(2)}`;
        } catch (error) {
            console.error("Error loading cart:", error);
        }
    }

    const changeQuantity = async function (productId, change) {
        await updateCartQuantity(productId, change);
        loadCart();
    };


    document.getElementById("cart-table").addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const buttonId = e.target.id;
            const [action, productId] = buttonId.split("-");

            if (action === "plus") {
                changeQuantity(parseInt(productId), 1);
            } else if (action === "minus") {
                changeQuantity(parseInt(productId), -1);
            }
        }
    });

    document.getElementById("proceed-checkout").addEventListener("click", () => {
        const cartId = parseInt(localStorage.getItem('cartID'));
        let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        updateCart(cartId, cartProducts);
    });

    window.clearCart = function () {
        localStorage.removeItem("cartProducts");
        loadCart();
    };

    loadCart();
});
