import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, List, Alert, Typography } from "antd";
import usePostsStore from "../store/usePostsStore";
import useUserStore from "../store/useUserStore";

const { Text } = Typography;

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const postIdNum = Number(id);

    const { getPostById, getCommentsByPostId } = usePostsStore();
    const { users } = useUserStore();

    const post = getPostById(postIdNum);
    const comments = getCommentsByPostId(postIdNum);

    useEffect(() => {
        console.log("Post Details:", post);
        console.log("Comments:", comments);
    }, [post, comments]);

    if (!post) {
        return <Alert message="Post not found" type="warning" showIcon />;
    }

    const getAuthorName = (userId: number) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "Unknown Author";
    };

    return (
        <div className="p-4">
            <Card title={post.title} className="shadow-md">
                <Text type="secondary">By: {getAuthorName(post.userId)}</Text>
                <p className="text-gray-700 mt-2">{post.body}</p>
            </Card>

            <h3 className="mt-6 text-xl font-semibold">Comments</h3>

            {comments.length > 0 ? (
                <List
                    dataSource={comments}
                    className="mt-2"
                    renderItem={(comment) => (
                        <List.Item key={comment.id}>
                            <Card className="w-full shadow-sm">
                                <p className="text-gray-700">
                                    <strong className="text-blue-600">{comment.name}</strong>
                                </p>
                                <p className="text-gray-700">{comment.body}</p>
                            </Card>
                        </List.Item>
                    )}
                />
            ) : (
                <p className="text-gray-500 mt-2">No comments yet.</p>
            )}
        </div>
    );
};

export default PostDetail;
