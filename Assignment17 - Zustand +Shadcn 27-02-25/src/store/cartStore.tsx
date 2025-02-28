import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    productId: number;
    quantity: number;
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
                    alert(JSON.stringify(product));
                    const existingItem = state.cart.find((item) => item.productId === product.productId);
                    if (existingItem) {
                        return {
                            cart: state.cart.map((item) =>
                                item.productId === product.productId
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    } else {
                        return { cart: [...state.cart, { ...product, quantity: 1 }] };
                    }
                }),

            removeFromCart: (id: number) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.productId !== id),
                })),

            increaseQuantity: (id: number) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                })),

            decreaseQuantity: (id: number) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.productId === id && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                })),
        }),
        {
            name: "cart-storage",
        }
    )
);
