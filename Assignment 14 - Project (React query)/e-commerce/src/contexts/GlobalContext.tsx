import React, { createContext, useContext, ReactNode, useReducer, useEffect, useState } from "react";
import { reducer, initialState, Action, State } from "./GlobalReducer";
import { updateCart } from "../api";

const GlobalContext = createContext<
    { state: State; dispatch: React.Dispatch<Action>; selectedCategory: string; setSelectedCategory: React.Dispatch<React.SetStateAction<string>>; syncCart: () => Promise<void> }
    | undefined
>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [selectedCategory, setSelectedCategory] = useState("all");

    // useEffect(() => {

    // }, []);


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
