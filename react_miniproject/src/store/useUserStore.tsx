import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type User = {
    id: number;
    name: string;
    company: string;
    username: string;
    email: string;
    address: string;
    zip: string;
    state: string;
    country: string;
    phone: string;
};

type UserStore = {
    users: User[];
    loggedInUser: User | null;
    setUsers: (users: User[]) => void;
    addUser: (user: User) => void;
    updateUser: (id: number, updatedUser: Partial<User>) => void;
    deleteUser: (id: number) => void;
    setLoggedInUser: (user: User | null) => void;
};

const useUserStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                users: [],
                loggedInUser: null,

                setUsers: (users: User[]) => set(() => ({ users })),

                addUser: (user) =>
                    set((state) => ({ users: [...state.users, user] })),

                updateUser: (id, updatedUser) =>
                    set((state) => ({
                        users: state.users.map((user) =>
                            user.id === id ? { ...user, ...updatedUser } : user
                        ),
                    })),

                deleteUser: (id) =>
                    set((state) => ({
                        users: state.users.filter((user) => user.id !== id),
                    })),

                setLoggedInUser: (user) => set(() => ({ loggedInUser: user })),
            }),
            { name: "user-store" }
        )
    )
);

export default useUserStore;
