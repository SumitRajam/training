import { Product, UserDetails } from "../api";

export interface State {
    products: Product[];
    cart: Product[];
    user: UserDetails | null;
}

export const initialState: State = {
    products: [],
    cart: [],
    user: null,
};

export type Action =
    | { type: "SET_PRODUCTS"; payload: Product[] }
    | { type: "ADD_TO_CART"; payload: Product }
    | { type: "REMOVE_FROM_CART"; payload: number }
    | { type: "SET_USER"; payload: UserDetails | null }
    | { type: "LOGOUT" };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        case "ADD_TO_CART":
            return { ...state, cart: [...state.cart, action.payload] };
        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter((p) => p.id !== action.payload) };
        case "SET_USER":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null, cart: [] };
        default:
            return state;
    }
};
