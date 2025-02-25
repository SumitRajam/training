import React, { createContext, useContext, ReactNode, useReducer, useEffect, useState } from "react";
import { reducer, initialState, Action, State } from "./GlobalReducer";
import { fetchUserCart, fetchProductDetails, updateCart } from "../api";
// Create context
const GlobalContext = createContext<
    { state: State; dispatch: React.Dispatch<Action>; selectedCategory: string; setSelectedCategory: React.Dispatch<React.SetStateAction<string>>; syncCart: () => Promise<void> }
    | undefined
>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const cart = await fetchUserCart(2);
            const formattedCart = [];

            for (const { productId, quantity } of cart) {
                const product = await fetchProductDetails(productId);
                if (product) {
                    formattedCart.push({ ...product, quantity });
                }
            }

            dispatch({ type: "SET_CART", payload: formattedCart });
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const syncCart = async () => {
        try {
            await updateCart(2, state.cart.map(({ id, quantity }) => ({ productId: id, quantity: quantity || 1 })));
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    return (
        <GlobalContext.Provider value={{ state, dispatch, selectedCategory, setSelectedCategory, syncCart }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) throw new Error("Must be used within a GlobalProvider");
    return context;
};
