import axios from 'axios'
import { useQuery, useMutation } from "@tanstack/react-query";
import useUserStore from "./store/useUserStore";
import useCompanyStore from "./store/useCompanyStore";

const app = axios.create({
    baseURL: "https://json-placeholder.mock.beeceptor.com",
    headers: { "Content-Type": "application/json" }
});

export const useLogin = () => {
    const { setLoggedInUser } = useUserStore();

    return useMutation({
        mutationFn: async ({ username, password }) => {
            try {
                const response = await app.post("/login", { username, password });
                return response.data;
            } catch (error) {
                console.error("Login failed:", error.response?.data || error.message);
                throw new Error(error.response?.data?.message || "Login failed");
            }
        },
    });
};

export const useFetchData = () => {
    const { setUsers } = useUserStore();
    const { setCompanies } = useCompanyStore();

    return useQuery({
        queryKey: ["data"],
        queryFn: async () => {
            const storedUsers = localStorage.getItem("user-store");
            const storedCompanies = localStorage.getItem("company-store");

            if (storedUsers && storedCompanies) {
                const usersData = JSON.parse(storedUsers).state.users;
                const companiesData = JSON.parse(storedCompanies).state.companies;

                if (usersData.length > 0 && companiesData.length > 0) {
                    return {
                        totalUsers: usersData.length,
                        totalCompanies: companiesData.length,
                    };
                }
            }

            const usersResponse = await app.get("/users");
            const companiesResponse = await app.get("/companies");

            setUsers(usersResponse.data);
            setCompanies(companiesResponse.data);

            return {
                totalUsers: usersResponse.data.length,
                totalCompanies: companiesResponse.data.length,
            };
        },
        staleTime: 1000 * 60 * 60 * 2,
    });
}

export const useUserDetails = (user_id: number) => {
    return useQuery({
        queryKey: ["user", user_id],
        queryFn: async () => {
            const response = await app.get(`/users/${user_id}`);
            return response.data;
        },
        enabled: !!user_id,
    });
};

export const useCompanyDetails = (company_id: number) => {
    return useQuery({
        queryKey: ["company", company_id],
        queryFn: async () => {
            const response = await app.get(`/companies/${company_id}`);
            return response.data;
        },
        enabled: !!company_id,
    });
};

export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const { data } = await app.get(`/posts`);
            return data;
        },
    });
};

export const usePostById = (post_id: number) => {
    return useQuery({
        queryKey: ['posts', post_id],
        queryFn: async () => {
            console.log(`Post ${post_id}`);
            const response = await app.get(`/posts/${post_id}`);
            return response.data;
        },
        enabled: !!post_id,
    });
};

export const useComments = () => {
    return useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const { data } = await app.get(`/comments`);
            return data;
        },
    });
};

export const useCommentById = (commentId: number) => {
    return useQuery({
        queryKey: ['comment', commentId],
        queryFn: async () => {
            const { data } = await app.get(`/ comments / ${commentId}`);
            return data;
        },

        enabled: !!commentId,

    });
};