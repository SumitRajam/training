import { fetchProducts, addProduct, deleteProduct, Product } from "./api.js";

document.addEventListener("DOMContentLoaded", async function () {
    const productList = document.getElementById("product-list") as HTMLElement;
    const addProductForm = document.getElementById("addProductForm") as HTMLFormElement;

    async function loadProducts(): Promise<void> {
        productList.innerHTML = `<div class="text-center"><p>Loading products...</p></div>`;
        try {
            const products: Product[] = await fetchProducts();

            if (products.length > 0) {
                displayProducts(products);
            } else {
                productList.innerHTML = `<div class="text-center text-danger"><p>No products found.</p></div>`;
            }
        } catch (error) {
            productList.innerHTML = `<div class="text-center text-danger"><p>Failed to load products.</p></div>`;
            console.error("Error loading products:", error);
        }
    }

    function displayProducts(products: Product[]): void {
        let productCard = "";
        products.forEach((product) => {
            productCard += `
                <div class="m-4" style="width:300px; min-width: 300px; height:auto;">
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
                </div>`;
        });
        productList.innerHTML = productCard;
    }

    productList.addEventListener("click", async function (event: Event) {
        const target = event.target as HTMLElement;
        if (target.classList.contains("delete-product")) {
            const productId = target.getAttribute("data-id");
            if (!productId) return;

            const response = await deleteProduct(parseInt(productId));
            if (response) {
                loadProducts();
            } else {
                alert("Failed to delete product.");
            }
        }
    });

    addProductForm.addEventListener("submit", async function (event: Event) {
        event.preventDefault();

        const title = (document.getElementById("productTitle") as HTMLInputElement).value;
        const price = parseFloat((document.getElementById("productPrice") as HTMLInputElement).value);
        const category = (document.getElementById("productCategory") as HTMLInputElement).value;
        const image = (document.getElementById("productImage") as HTMLInputElement).value;

        const newProduct: Omit<Product, "id"> = {
            title,
            price,
            category,
            image,
            description: "Newly added product",
        };

        const response = await addProduct(newProduct);
        if (response) {
            addProductForm.reset();
            loadProducts();
        } else {
            alert("Failed to add product.");
        }
    });

    loadProducts();
});
