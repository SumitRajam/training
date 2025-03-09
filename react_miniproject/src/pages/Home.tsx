import React from "react";
import { Card, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import { useFetchData } from "../api";
import useUserStore from "../store/useUserStore";
import useCompanyStore from "../store/useCompanyStore";

const { Title } = Typography;

const Home = () => {
    const { isLoading } = useFetchData();
    const { users } = useUserStore();
    const { companies } = useCompanyStore();

    if (isLoading) {
        return <Spin size="large" className="flex justify-center items-center min-h-screen" />;
    }

    return (
        <div className="grid grid-cols-2 gap-6 p-6">
            <Link to="manage-users">
                <Card className="cursor-pointer">
                    <Title level={3}>Total Users</Title>
                    <p className="text-2xl font-bold">{users.length}</p>
                </Card>
            </Link>
            <Link to="manage-companies">
                <Card className="cursor-pointer">
                    <Title level={3}>Total Companies</Title>
                    <p className="text-2xl font-bold">{companies.length}</p>
                </Card>
            </Link>
        </div>
    );
};

export default Home;
