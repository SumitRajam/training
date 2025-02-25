import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useMutation } from "@tanstack/react-query";

const Cart = () => {
    const { state, dispatch, syncCart } = useGlobalContext();

    const syncCartMutation = useMutation({
        mutationFn: () => syncCart(),
        onError: (error) => console.error("Error updating cart:", error),
        onSuccess: () => console.log("Cart updated successfully:", state.cart),
    });

    const handleIncrease = (id: number) => {
        dispatch({ type: "INCREASE_QUANTITY", payload: id });
        syncCartMutation.mutate();
    };

    const handleDecrease = (id: number) => {
        dispatch({ type: "DECREASE_QUANTITY", payload: id });
        syncCartMutation.mutate();
    };

    const handleRemove = (id: number) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: id });
        syncCartMutation.mutate();
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Your Cart</h2>
            {state.cart.length === 0 ? (
                <p className="text-muted">Your cart is empty. If not please wait till content is Loaded.</p>
            ) : (
                <ul className="list-group">
                    {state.cart.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{item.title}</h5>
                                <p className="mb-1">Price: <strong>${item.price}</strong></p>
                                <p className="mb-1">Quantity: {item.quantity}</p>
                            </div>
                            <div>
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleIncrease(item.id)}>+</button>
                                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleDecrease(item.id)} disabled={item.quantity === 1}>-</button>
                                <button className="btn btn-sm btn-danger" onClick={() => {
                                    if (window.confirm(`Do you want to clear ${item.title} from cart?`)) {
                                        handleRemove(item.id);
                                    }
                                }
                                }>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
