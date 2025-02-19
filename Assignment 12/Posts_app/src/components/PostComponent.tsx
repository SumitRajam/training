import { useEffect, useState } from "react";
import axios from "axios";

type PostType = {
    userId: number;
    id?: number;
    title: string;
    body: string;
};

export default function FetchPost() {
    const [post, setPost] = useState<PostType | null>(null);
    const [postId, setPostId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [formData, setFormData] = useState<PostType>({
        userId: 1,
        title: "",
        body: ""
    });

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

    function setNewPostData<T>(key: string, value: T): void {
        setFormData((prev) => ({ ...prev, [key]: value }));
    }

    async function createPost(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await axios.post(
                `https://jsonplaceholder.typicode.com/posts`, {
                title: formData.title,
                body: formData.body,
                userId: 1,
            }
            );
            window.alert(`Status: ${JSON.stringify(res.status)}\nResponse Data:${JSON.stringify(res.data)}`);

        } catch (error) {
            alert(error as Error);
        } finally {
            setIsAdding(false);
        }
    }

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
                <input type="number" placeholder="Enter a post ID" value={postId}
                    onChange={(e) => {
                        setPostId(e.target.value);
                        setPost(null);
                    }}
                />
                {loading && <p>Loading</p>}
                {error && <p>{error}</p>}
                {post && postId && (
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

                <button className="btn btn-primary p-3" type="submit" onClick={() => setIsAdding(true)}>Create New Post</button>
            </div>

            {isAdding && (
                <div
                    className="position-fixed top-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ zIndex: 50 }}
                >
                    <div className="bg-white p-4 rounded shadow-lg" style={{ width: "320px" }}>
                        <h5 className="text-center">Add New Task</h5>
                        <form>
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" placeholder="Enter title" onChange={(e) => { setNewPostData('title', e.target.value) }} required />
                            <label className="form-label">Body</label>
                            <textarea className="form-control" rows={3} placeholder="Enter description" onChange={(e) => { setNewPostData('body', e.target.value) }} required></textarea>
                            <div className="d-flex mt-3">
                                <button type="submit" className="btn btn-primary w-50 me-2" onClick={createPost}>
                                    Save
                                </button>
                                <button type="button" className="btn btn-secondary w-50" onClick={() => setIsAdding(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
