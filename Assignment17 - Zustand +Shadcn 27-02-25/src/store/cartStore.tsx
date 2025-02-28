import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: number;
    quantity: number;
    title: string;
    image: string;
    price: number;
    description: string;
}

export interface CartState {
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
    addToCart: (product: CartItem) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],

            setCart: (cart: CartItem[]) => set({ cart }),

            addToCart: (product: CartItem) =>
                set((state) => {
                    let quantityInput: string | null = prompt("Enter Quantity: ");
                    let quantity: number = parseInt(quantityInput || "0", 10); // Convert to number safely

                    if (isNaN(quantity) || quantity <= 0) {
                        alert("Invalid input! Please enter a valid number.");
                        return state; // Return the previous state if input is invalid
                    }

                    const existingItem = state.cart.find((item) => item.id === product.id);
                    if (existingItem) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity } : item
                            ),
                        };
                    } else {
                        return { cart: [...state.cart, { ...product, quantity }] };
                    }
                }),

            removeFromCart: (id: number) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== id),
                })),

            increaseQuantity: (id: number) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                })),

            decreaseQuantity: (id: number) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === id && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                })),
        }),
        {
            name: "cart",
        }
    )
);
