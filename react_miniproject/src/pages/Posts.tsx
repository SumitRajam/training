import React, { useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";
import { usePosts, useComments } from "../api";
import usePostsStore from "../store/usePostsStore";
import useUserStore from "../store/useUserStore";

const { Text } = Typography;

const Posts: React.FC = () => {
    const { data: posts, isLoading, error } = usePosts();
    const { data: comments } = useComments();

    const { setPosts, setComments } = usePostsStore();
    const { users } = useUserStore();

    useEffect(() => {
        if (posts) setPosts(posts);
        if (comments) setComments(comments);
    }, [posts, comments, setPosts, setComments]);

    if (isLoading) return <div className="text-center text-lg font-semibold mt-10">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-10">Error fetching posts</div>;

    const getAuthorName = (userId: number) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "Unknown Author";
    };

    return (
        <div className="p-4">
            <Row gutter={[16, 16]} justify="center">
                {posts.map((post) => (
                    <Col key={post.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            className="shadow-md rounded-lg transition-transform duration-300 hover:scale-105"
                        >
                            <Text type="secondary">By: {getAuthorName(post.userId)}</Text>
                            <Card.Meta title={post.title} description={post.body.slice(0, 80) + "..."} />
                            <div className="mt-3">
                                <Link to={`${post.id}`} className="text-blue-500 hover:underline">
                                    Read More (comments)
                                </Link>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Posts;
