import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchUserDetails } from "../api";

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
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
