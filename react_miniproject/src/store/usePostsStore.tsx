import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type Post = {
    id: number;
    title: string;
    body: string;
    userId: number;
    comment_count: number;
};

type Comment = {
    id: number;
    postId: number;
    body: string;
    name: string;
};

type PostStore = {
    posts: Post[];
    comments: Comment[];
    setPosts: (posts: Post[]) => void;
    setComments: (comments: Comment[]) => void;
    getPostById: (id: number) => Post | undefined;
    getCommentsByPostId: (postId: number) => Comment[];
};

const usePostsStore = create<PostStore>()(
    devtools(
        persist(
            (set, get) => ({
                posts: [],
                comments: [],

                setPosts: (posts) => set(() => ({ posts })),
                setComments: (comments) => set(() => ({ comments })),

                getPostById: (id) => get().posts.find((post) => post.id === id),

                getCommentsByPostId: (postId) =>
                    get().comments.filter((comment) => comment.postId === postId),
            }),
            { name: "post-store" }
        )
    )
);

export default usePostsStore;
