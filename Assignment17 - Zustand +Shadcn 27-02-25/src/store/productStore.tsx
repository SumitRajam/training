import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

type NewProduct = Omit<Product, "id">;

type ProductStore = {
    products: Product[];
    setProducts: (products: Product[]) => void;
    addProduct: (product: NewProduct) => void;
    removeProduct: (id: number) => void;
};

const useProductStore = create<ProductStore>()(
    devtools(
        persist(
            (set) => ({
                products: [],

                setProducts: (products) => set(() => ({ products })),

                addProduct: (product) =>
                    set((state) => ({
                        products: [{ id: Date.now(), ...product }, ...state.products],
                    })),

                removeProduct: (id: number) =>
                    set((state) => ({
                        products: state.products.filter((product) => product.id !== id),
                    })),
            }),
            { name: "productStore" }
        )
    )
);

export default useProductStore;
