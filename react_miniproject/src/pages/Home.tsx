import React from "react";
import { Card, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import { useFetchData } from "../api";
import useUserStore from "../store/useUserStore";
import useCompanyStore from "../store/useCompanyStore";
import usePostsStore from "../store/usePostsStore";

const { Title, Text } = Typography;

const Home = () => {
    const { isLoading } = useFetchData();
    const { users } = useUserStore();
    const { companies } = useCompanyStore();
    const { posts, comments } = usePostsStore();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            <Link to="manage-users">
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border rounded-2xl p-6 bg-white shadow-md">
                    <Title level={2} className="text-gray-700">Total Users</Title>
                    <Text className="text-5xl font-bold text-gray-900">{users.length}</Text>
                </Card>
            </Link>

            <Link to="manage-companies">
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border rounded-2xl p-6 bg-white shadow-md">
                    <Title level={2} className="text-gray-700">Total Companies</Title>
                    <Text className="text-5xl font-bold text-gray-900">{companies.length}</Text>
                </Card>
            </Link>

            <Link to="posts">
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border rounded-2xl p-6 bg-white shadow-md">
                    <Title level={2} className="text-gray-700">Total Posts</Title>
                    <Text className="text-5xl font-bold text-gray-900">{posts.length}</Text>
                    <div className="mt-4">
                        <Title level={3} className="text-gray-600">Total Comments</Title>
                        <Text className="text-4xl font-bold text-gray-800">{comments.length}</Text>
                    </div>
                </Card>
            </Link>
        </div>
    );
};

export default Home;
