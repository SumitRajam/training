import { fetchProducts, addProduct, deleteProduct } from "./api.js";

document.addEventListener("DOMContentLoaded", async function () {
    const productList = document.getElementById("product-list");
    const addProductForm = document.getElementById("addProductForm");

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
            productCard +=
                `<div class="m-4" style="width:300px; min-width: 300px; height:auto;">
                    <div class="card shadow-sm h-100">
                        <img src="${product.image}" class="card-img-top p-3" alt="${product.title}" style="height: 200px; object-fit: contain;">
                            <div class="card-body">
                                <h6 class="card-title">${product.title}</h6>
                                <p class="card-text text-muted small">Category: ${product.category}</p>
                                <p class="card-text">Description: ${product.description}</p>
                                <p class="fw-bold">Price: $${product.price}</p>
                                <p class="card-text text-muted">Rating: ${product.rating?.rate || 0} (${product.rating?.count || 0} reviews)</p>
                                <button class="btn delete-product btn-danger w-100" data-id="${product.id}">Delete</button>
                            </div>
                    </div>
                </div>`
                ;
        });
        productList.innerHTML = productCard;
    }

    document.getElementById("product-list").addEventListener("click", async function (event) {
        if (event.target.classList.contains("delete-product")) {
            const productId = event.target.getAttribute("data-id");
            const response = await deleteProduct(productId);
            if (response) {
                loadProducts();
            } else {
                alert("Failed to delete product.");
            }
        }
    });

    addProductForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const newProduct = {
            title: document.getElementById("productTitle").value,
            price: parseFloat(document.getElementById("productPrice").value),
            category: document.getElementById("productCategory").value,
            image: document.getElementById("productImage").value,
            description: "Newly added product",
        };

        const response = await addProduct(newProduct);
        if (response) {
            document.getElementById("addProductForm").reset();
            loadProducts();
        } else {
            alert("Failed to add product.");
        }
    });

    loadProducts();
});