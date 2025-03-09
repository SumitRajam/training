import React from "react";
import { Card, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import { useFetchData } from "../api";
import useUserStore from "../store/useUserStore";
import useCompanyStore from "../store/useCompanyStore";
import { usePosts, useComments, useRoles } from "../api";

const { Title, Text } = Typography;

const Home = () => {
    const { isLoading } = useFetchData();
    const { users } = useUserStore();
    const { companies } = useCompanyStore();
    const { data: post } = usePosts();
    const { data: comment } = useComments();
    const { data: roles, isLoading: rolesLoading } = useRoles();

    if (isLoading || rolesLoading || !post || !comment || !roles) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-6 p-4 sm:p-8 w-full">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row w-full gap-6">
                {/* Users & Companies (Stacked on Mobile, Side by Side on Large Screens) */}
                <div className="flex flex-col gap-6 flex-1">
                    <Link to="manage-users">
                        <Card className="w-full cursor-pointer hover:shadow-xl transition-all duration-300 border rounded-2xl p-4 sm:p-5 bg-white shadow-md">
                            <Title level={4} className="text-gray-700">Total Users</Title>
                            <Text className="text-3xl sm:text-4xl font-semibold text-gray-900">{users.length}</Text>
                        </Card>
                    </Link>
                    <Link to="manage-companies">
                        <Card className="w-full cursor-pointer hover:shadow-xl transition-all duration-300 border rounded-2xl p-4 sm:p-5 bg-white shadow-md">
                            <Title level={4} className="text-gray-700">Total Companies</Title>
                            <Text className="text-3xl sm:text-4xl font-semibold text-gray-900">{companies.length}</Text>
                        </Card>
                    </Link>
                </div>

                {/* Posts & Comments */}
                <Link to="posts" className="flex-1">
                    <Card className="w-full cursor-pointer hover:shadow-xl transition-all duration-300 border rounded-2xl p-4 sm:p-5 bg-white shadow-md">
                        <Title level={4} className="text-gray-700">Total Posts</Title>
                        <Text className="text-3xl sm:text-4xl font-semibold text-gray-900">{post.length}</Text>
                        <div className="mt-3">
                            <Title level={5} className="text-gray-600">Total Comments</Title>
                            <Text className="text-2xl sm:text-3xl font-semibold text-gray-800">{comment.length}</Text>
                        </div>
                    </Card>
                </Link>
            </div>

            {/* Roles Section */}
            <div className="w-full flex justify-start">
                <Card className="w-full md:w-1/2 cursor-pointer hover:shadow-xl transition-all duration-300 border rounded-2xl p-4 sm:p-5 bg-white shadow-md">
                    <Title level={4} className="text-gray-700">Roles</Title>
                    <div className="mt-3">
                        {roles.map((role: { id: number; name: string; description: string }) => (
                            <div key={role.id} className="mb-2">
                                <Text className="text-base font-semibold">{role.name}</Text>
                                <Text className="text-sm text-gray-600 block">{role.description}</Text>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Home;
