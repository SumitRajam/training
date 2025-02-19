import React, { useEffect, useState } from "react";

type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export default function FetchPost() {
    const [post, setPost] = useState<PostType | null>(null);
    const [postId, setPostId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPost = async () => {
        if (!postId) return;
        setLoading(true);
        setPost(null);
        setError(null);

        try {
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${postId}`
            );
            if (!res.ok) {
                throw new Error("Post not found");
            }
            const data = await res.json();
            setPost(data);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchPost();
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [postId]);

    return (
        <>
            <div className="container d-flex flex-column mt-5 mb-5 gap-4 shadow-lg p-2 rounded-lg" style={{ width: "330px" }}>
                <h2>Fetch Post - {postId}</h2>
                <input
                    type="number"
                    placeholder="Enter a post ID"
                    value={postId}
                    onChange={(e) => {
                        setPostId(e.target.value);
                        setPost(null);
                    }}
                />
                {loading && <p>Loading</p>}
                {error && <p>{error}</p>}
                {post && postId && (
                    // <div>
                    //     <p>{post.title}</p>
                    // <p>{post.body}</p>
                    // </div>
                    <div className="card text-center m-3">
                        <div className="card-header">
                            Post No. {post.id}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body}</p>
                        </div>
                    </div>
                )}

                <button className="btn btn-primary p-3" type="submit">Create New Post</button>
            </div>
        </>
    );
};
