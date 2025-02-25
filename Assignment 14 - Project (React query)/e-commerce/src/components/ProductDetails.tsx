import { useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useMutation } from "@tanstack/react-query";

const ProductDetails = () => {
    const { syncCart, state, dispatch } = useGlobalContext();
    const { id } = useParams();
    const productId = id ? parseInt(id, 10) : null;

    const syncCartMutation = useMutation({
        mutationFn: () => syncCart(),
        onError: (error) => console.error("Error updating cart:", error),
    });


    const addToCart = (id: number, title: string, image: string, description: string, category: string, price: number) => {
        const quantity = Number(window.prompt("Enter quantity:"));

        if (!quantity || quantity <= 0) {
            alert("Invalid quantity! Please enter a valid number.");
            return;
        }

        dispatch({ type: "ADD_TO_CART", payload: { id, image, description, title, category, price, quantity } });
        syncCartMutation.mutate();

        syncCart();
    }

    const products = state.products;

    const product = products.find((p) => p.id === productId);

    if (!product) return <p className="text-center mt-4">Product not found.</p>;

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
                    <button className="btn btn-primary mt-3 w-100">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
