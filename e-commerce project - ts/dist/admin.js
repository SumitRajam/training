var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchProducts, addProduct, deleteProduct } from "./api.js";
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const productList = document.getElementById("product-list");
        const addProductForm = document.getElementById("addProductForm");
        function loadProducts() {
            return __awaiter(this, void 0, void 0, function* () {
                productList.innerHTML = `<div class="text-center"><p>Loading products...</p></div>`;
                try {
                    const products = yield fetchProducts();
                    if (products.length > 0) {
                        displayProducts(products);
                    }
                    else {
                        productList.innerHTML = `<div class="text-center text-danger"><p>No products found.</p></div>`;
                    }
                }
                catch (error) {
                    productList.innerHTML = `<div class="text-center text-danger"><p>Failed to load products.</p></div>`;
                    console.error("Error loading products:", error);
                }
            });
        }
        function displayProducts(products) {
            let productCard = "";
            products.forEach((product) => {
                var _a, _b;
                productCard += `
                <div class="m-4" style="width:300px; min-width: 300px; height:auto;">
                    <div class="card shadow-sm h-100">
                        <img src="${product.image}" class="card-img-top p-3" alt="${product.title}" style="height: 200px; object-fit: contain;">
                        <div class="card-body">
                            <h6 class="card-title">${product.title}</h6>
                            <p class="card-text text-muted small">Category: ${product.category}</p>
                            <p class="card-text">Description: ${product.description}</p>
                            <p class="fw-bold">Price: $${product.price}</p>
                            <p class="card-text text-muted">Rating: ${((_a = product.rating) === null || _a === void 0 ? void 0 : _a.rate) || 0} (${((_b = product.rating) === null || _b === void 0 ? void 0 : _b.count) || 0} reviews)</p>
                            <button class="btn delete-product btn-danger w-100" data-id="${product.id}">Delete</button>
                        </div>
                    </div>
                </div>`;
            });
            productList.innerHTML = productCard;
        }
        productList.addEventListener("click", function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                const target = event.target;
                if (target.classList.contains("delete-product")) {
                    const productId = target.getAttribute("data-id");
                    if (!productId)
                        return;
                    const response = yield deleteProduct(parseInt(productId));
                    if (response) {
                        loadProducts();
                    }
                    else {
                        alert("Failed to delete product.");
                    }
                }
            });
        });
        addProductForm.addEventListener("submit", function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const title = document.getElementById("productTitle").value;
                const price = parseFloat(document.getElementById("productPrice").value);
                const category = document.getElementById("productCategory").value;
                const image = document.getElementById("productImage").value;
                const newProduct = {
                    title,
                    price,
                    category,
                    image,
                    description: "Newly added product",
                };
                const response = yield addProduct(newProduct);
                if (response) {
                    addProductForm.reset();
                    loadProducts();
                }
                else {
                    alert("Failed to add product.");
                }
            });
        });
        loadProducts();
    });
});
