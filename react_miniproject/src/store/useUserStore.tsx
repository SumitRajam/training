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
    setUsers: (users: User[]) => void;
    addUser: (user: User) => void;
    updateUser: (id: number, updatedUser: Partial<User>) => void;
    deleteUser: (id: number) => void;
};

const useUserStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                users: [],

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
            }),
            { name: "user-store" }
        )
    )
);

export default useUserStore;