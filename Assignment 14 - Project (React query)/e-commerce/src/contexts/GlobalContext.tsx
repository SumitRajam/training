import React, { createContext, useContext, ReactNode, useReducer } from "react";
import { reducer, initialState, Action, State } from "./GlobalReducer";

interface GlobalContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) throw new Error("useGlobalContext must be used within a GlobalProvider");
    return context;
};
