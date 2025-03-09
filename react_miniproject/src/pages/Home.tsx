import React from "react";
import { Card, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import { useFetchData } from "../api";
import useUserStore from "../store/useUserStore";
import useCompanyStore from "../store/useCompanyStore";
import usePostsStore from "../store/usePostsStore";

const { Title } = Typography;

const Home = () => {
    const { isLoading } = useFetchData();
    const { users } = useUserStore();
    const { companies } = useCompanyStore();
    const { posts, comments } = usePostsStore();

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <Spin size="large" />
        </div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <Link to="manage-users">
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border rounded-2xl p-4 bg-white shadow-md">
                    <Title level={3} className="text-blue-600">Total Users</Title>
                    <p className="text-4xl font-bold text-gray-800">{users.length}</p>
                </Card>
            </Link>

            <Link to="manage-companies">
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border rounded-2xl p-4 bg-white shadow-md">
                    <Title level={3} className="text-green-600">Total Companies</Title>
                    <p className="text-4xl font-bold text-gray-800">{companies.length}</p>
                </Card>
            </Link>

            <Link to="posts">
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border rounded-2xl p-4 bg-white shadow-md">
                    <Title level={3} className="text-purple-600">Total Posts</Title>
                    <p className="text-4xl font-bold text-gray-800">{posts.length}</p>
                    <Title level={4} className="text-gray-600 mt-2">Total Comments</Title>
                    <p className="text-3xl font-bold text-gray-700">{comments.length}</p>
                </Card>
            </Link>
        </div>
    );
};

export default Home;
