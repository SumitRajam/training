import { fetchProducts, fetchCart, updateCart, createCart } from "./api.js";

document.addEventListener("DOMContentLoaded", async function () {
    const productList = document.getElementById("product-list");
    const items = [];
    async function loadProducts() {
        productList.innerHTML = `<div class="text-center"><p>Loading products...</p></div>`;
        const products = await fetchProducts();

        if (products.length > 0) {
            displayProducts(products);
        } else {
            productList.innerHTML = `<div class="text-center text-danger"><p>Failed to load products.</p></div>`;
        }
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

    document.getElementById("product-list").addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const productId = event.target.getAttribute("data-id");
            const productTitle = event.target.getAttribute("data-title");
            chooseQuantity(productId, productTitle);
        }
    });

    function chooseQuantity(productId, productTitle) {
        const quantity = prompt(`Enter quantity for "${productTitle}":`, "1");

        if (quantity !== null && !isNaN(quantity) && parseInt(quantity) > 0) {
            updateCartLogic(productId, parseInt(quantity));
        } else {
            alert("Invalid quantity. Please enter a number greater than 0.");
        }
    }

    async function updateCartLogic(productId, quantity) {
        let cartId = localStorage.getItem("cartID");
        let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

        let existingProduct = cartProducts.find(p => p.productId === parseInt(productId));
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cartProducts.push({ productId: parseInt(productId), quantity: quantity });
        }

        if (cartId) {
            const success = await updateCart(cartId, cartProducts);
            // if (success) alert("Cart updated successfully!");
        } else {
            const newCart = await createCart(cartProducts);
            if (newCart) {
                localStorage.setItem("cartId", newCart.id);
                alert("New cart created!");
            }
        }

        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }

    loadProducts();
});
