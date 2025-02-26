export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
    quantity: number;
}

export interface State {
    products: Product[];
    cart: Product[];
    user: any | null;
}

export type Action = { type: "SET_PRODUCTS"; payload: Product[] } | { type: "ADD_TO_CART"; payload: Product } | { type: "REMOVE_FROM_CART"; payload: number } | { type: "INCREASE_QUANTITY"; payload: number } | { type: "DECREASE_QUANTITY"; payload: number } | { type: "SET_USER"; payload: any } | { type: "LOGOUT" } | { type: "SET_CART"; payload: Product[] };

export const initialState: State = {
    products: [],
    cart: [],
    user: null
};

export const reducer = (state: State, action: Action): State => {

    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };

        case "SET_CART":
            return { ...state, cart: action.payload };

        case "ADD_TO_CART": {
            const existingItem = state.cart.find((item) => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload.id ? { ...item, quantity: (item.quantity || 1) + action.payload.quantity || 1 } : item
                    )
                };
            } else {
                return {
                    ...state, cart: [...state.cart, { ...action.payload }]
                };
            }
        }

        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

        case "INCREASE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload ? { ...item, quantity: (item.quantity || 0) + 1 } : item
                )
            };

        case "DECREASE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((item) => item.id === action.payload && (item.quantity || 0) > 1 ? { ...item, quantity: (item.quantity || 1) - 1 } : item
                )
            };

        case "SET_USER":
            return { ...state, user: action.payload };

        case "LOGOUT":
            return { ...state, user: null, cart: [] };

        default:
            return state;
    }
};
