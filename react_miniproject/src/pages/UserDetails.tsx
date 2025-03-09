import React from "react";
import { useParams } from "react-router-dom";
import { Card, Spin, Typography } from "antd";
import { useUserDetails } from "../api";

const { Title } = Typography;

export default function UserDetails() {
    const { id } = useParams<{ id: string }>();
    const userId = Number(id);

    const { data: user, isLoading, error } = useUserDetails(userId);

    if (isLoading) return <Spin size="large" className="flex justify-center items-center min-h-screen" />;
    if (error) return <p className="text-red-500 text-center">Error fetching user details</p>;

    return (
        <div className="p-6 flex justify-center">
            <Card className="max-w-lg w-full">
                <Title level={3}>{user?.name}</Title>
                <p><strong>Username:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.phone}</p>
                <p><strong>Company:</strong> {user?.company}</p>
                <p><strong>Address:</strong> {user?.address}, {user?.state}, {user?.country} - {user?.zip}</p>
            </Card>
        </div>
    );
}
