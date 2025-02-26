import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useProducts } from "../contexts/MyHooks";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const ProductList = () => {
    const { selectedCategory, syncCart, dispatch } = useGlobalContext();
    const { data: products, isLoading, error } = useProducts(selectedCategory);

    useEffect(() => {
        if (products) {
            dispatch({ type: "SET_PRODUCTS", payload: products });
        }
    }, [products, dispatch]);

    const syncCartMutation = useMutation({
        mutationFn: () => syncCart(),
        onError: (error) => console.error("Error updating cart:", error),
    });

    if (isLoading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-danger text-center mt-4">Error loading products.</p>;

    const addToCart = (id: number, title: string, category: string, price: number, description: string, image: string) => {
        const quantity = Number(window.prompt("Enter quantity:"));
        console.log(quantity);
        if (!quantity || quantity <= 0) {
            alert("Invalid quantity! Please enter a valid number.");
            return;
        }

        dispatch({ type: "ADD_TO_CART", payload: { id, title, category, price, quantity, image, description } });
        syncCartMutation.mutate();

        syncCart();

    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Products</h2>

            <div className="container d-flex flex-wrap justify-content-center align-items-center">
                {products?.map((product) => (
                    <div key={product.id} className="m-4" style={{ minWidth: "300px", width: "300px", height: "390px" }}>
                        <div className="card shadow-sm h-100">
                            <img
                                src={product.image}
                                className="card-img-top p-3"
                                alt={product.title}
                                style={{ height: "200px", objectFit: "contain" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h6 className="card-title" style={{ height: "38.4px", overflow: "hidden" }}>
                                    {product.title.length > 40 ? product.title.substring(0, 40) + "..." : product.title}
                                </h6>
                                <p className="card-text text-muted small">{product.category}</p>
                                <p className="fw-bold">${product.price}</p>

                                <div className="d-flex gap-2">
                                    <Link
                                        to={`product/${product.id}`}
                                        className="btn btn-secondary w-100 mt-auto"
                                    >
                                        Details
                                    </Link>
                                    <button className="btn btn-primary w-100 mt-auto" onClick={() => addToCart(product.id, product.title, product.category, product.price, product.description, product.image)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
