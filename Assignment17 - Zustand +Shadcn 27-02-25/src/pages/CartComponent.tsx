import React from "react";
import { useCreateCart, useUpdateCart } from "../api";
import { useCartStore } from "../store/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CartComponent: React.FC = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
    const createCartMutation = useCreateCart();
    const updateCartMutation = useUpdateCart();

    const handleCreateCart = () => {
        createCartMutation.mutate(cart, {
            onSuccess: (data) => console.log("Cart created:", data),
            onError: (error) => console.error("Error creating cart:", error),
        });
    };

    const handleUpdateCart = (cartId: number) => {
        updateCartMutation.mutate(
            { cartId, updatedProducts: cart },
            {
                onSuccess: (data) => console.log("Cart updated:", data),
                onError: (error) => console.error("Error updating cart:", error),
            }
        );
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Your Cart</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <Card key={item.productId} className="shadow-md">
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                                    <div>
                                        <CardTitle>{item.title}</CardTitle>
                                        <p className="text-gray-600">Price: <strong>${item.price}</strong></p>
                                    </div>
                                </div>
                            </CardHeader>
                            <Separator />
                            <CardContent className="flex justify-between items-center p-4">
                                <div className="flex items-center space-x-3">
                                    <Button variant="outline" size="icon" onClick={() => decreaseQuantity(item.productId)} disabled={item.quantity === 1}>-</Button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <Button variant="outline" size="icon" onClick={() => increaseQuantity(item.productId)}>+</Button>
                                </div>
                                <Button variant="destructive" onClick={() => removeFromCart(item.productId)}>Remove</Button>
                            </CardContent>
                        </Card>
                    ))}
                    <div className="flex justify-center space-x-4 mt-4">
                        <Button onClick={handleCreateCart}>Create Cart</Button>
                        <Button variant="outline" onClick={() => handleUpdateCart(1)}>Update Cart</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartComponent;
