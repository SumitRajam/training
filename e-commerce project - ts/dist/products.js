var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchProducts, updateCart, createCart } from "./api.js";
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const productList = document.getElementById("product-list");
        const items = [];
        function loadProducts() {
            return __awaiter(this, void 0, void 0, function* () {
                productList.innerHTML = `<div class="text-center"><p>Loading products...</p></div>`;
                const products = yield fetchProducts();
                if (products.length > 0) {
                    displayProducts(products);
                }
                else {
                    productList.innerHTML = `<div class="text-center text-danger"><p>Failed to load products.</p></div>`;
                }
            });
        }
        function displayProducts(products) {
            let productCard = "";
            products.forEach(product => {
                productCard += `
                <div class="m-4" style="width:300px; min-width: 300px; height:390px;">
                    <div class="card shadow-sm h-100">
                        <img src="${product.image}" class="card-img-top p-3" alt="${product.title}" style="height: 200px; object-fit: contain;">
                        <div class="card-body">
                            <h6 class="card-title" style="height:38.4px">${product.title.length > 40 ? product.title.substring(0, 40) + "..." : product.title}</h6>
                            <p class="card-text text-muted small">${product.category}</p>
                            <p class="fw-bold">$${product.price}</p>
                            <button class="btn add-to-cart btn-primary w-100" data-id="${product.id}" data-title="${product.title}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
                if (!localStorage.getItem('items')) {
                    items.push(product);
                }
            });
            if (!localStorage.getItem('items')) {
                localStorage.setItem('items', JSON.stringify(items));
            }
            productList.innerHTML = productCard;
        }
        (_a = document.getElementById("product-list")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (event) {
            const target = event.target;
            if (target.classList.contains("add-to-cart")) {
                const productId = target.getAttribute("data-id");
                const productTitle = target.getAttribute("data-title");
                if (productId && productTitle) {
                    chooseQuantity(parseInt(productId), productTitle);
                }
            }
        });
        function chooseQuantity(productId, productTitle) {
            const quantity = prompt(`Enter quantity for "${productTitle}":`, "1");
            if (quantity !== null && !isNaN(parseInt(quantity)) && parseInt(quantity) > 0) {
                updateCartLogic(productId, parseInt(quantity));
            }
            else {
                alert("Invalid quantity. Please enter a number greater than 0.");
            }
        }
        function updateCartLogic(productId, quantity) {
            return __awaiter(this, void 0, void 0, function* () {
                let cartId = localStorage.getItem("cartID")
                    ? parseInt(localStorage.getItem("cartID"), 10)
                    : null;
                let cartProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
                let existingProduct = cartProducts.find(p => p.productId === productId);
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                }
                else {
                    cartProducts.push({ productId, quantity });
                }
                if (cartId) {
                    yield updateCart(cartId, cartProducts);
                }
                else {
                    const newCart = yield createCart(cartProducts);
                    if (newCart) {
                        localStorage.setItem("cartId", newCart.id.toString());
                        alert("New cart created!");
                    }
                }
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            });
        }
        loadProducts();
    });
});
