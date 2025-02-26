import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "../contexts/GlobalContext";

const ProductDetails = () => {
    const { syncCart, dispatch } = useGlobalContext();
    const { id } = useParams();
    const productId = id ? parseInt(id, 10) : null;
    const fetchProduct = async (id: number) => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        return response.json();
    };
    // ✅ Fetch product from API instead of state
    const { data: product, isLoading, error } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => fetchProduct(productId!),
        enabled: !!productId, // Only fetch if productId exists
    });

    const syncCartMutation = useMutation({
        mutationFn: () => syncCart(),
        onError: (error) => console.error("Error updating cart:", error),
    });

    const addToCart = () => {
        const quantity = Number(window.prompt("Enter quantity:"));

        if (!quantity || quantity <= 0) {
            alert("Invalid quantity! Please enter a valid number.");
            return;
        }

        dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
        syncCartMutation.mutate();
    };

    if (isLoading) return <p className="text-center mt-4">Loading product...</p>;
    if (error || !product) return <p className="text-center mt-4 text-danger">Product not found.</p>;

    return (
        <div className="container mt-4 d-flex flex-column align-items-center">
            <h2 className="mb-4">{product.title}</h2>
            <div className="d-flex flex-wrap justify-content-center gap-4 p-4 shadow-lg rounded" style={{ maxWidth: "800px" }}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: "300px", objectFit: "contain" }}
                />
                <div className="d-flex flex-column justify-content-center">
                    <h4 className="text-muted">{product.category}</h4>
                    <p>{product.description}</p>
                    <h3 className="fw-bold">${product.price}</h3>
                    <button className="btn btn-primary mt-3 w-100" onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
