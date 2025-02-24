import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchUserDetails, fetchByCategory } from "../api";

export const useProducts = (category: string) => {
    return useQuery({
        queryKey: ["products", category],
        queryFn: category !== "all" ? () => fetchByCategory(category) : fetchProducts,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
};

export const useUser = (userId: number) => {
    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => fetchUserDetails(userId),
        enabled: !!userId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
};
