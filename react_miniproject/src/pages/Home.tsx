import React from "react";
import { Card, Spin, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const fetchStats = async () => {
    const usersResponse = await axios.get("/users");
    const companiesResponse = await axios.get("/companies");
    return {
        totalUsers: usersResponse.data.length,
        totalCompanies: companiesResponse.data.length,
    };
};

const Home = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({ queryKey: ["stats"], queryFn: fetchStats });

    if (isLoading) return <Spin size="large" className="flex justify-center items-center min-h-screen" />;

    return (
        <div className="grid grid-cols-2 gap-6 p-6">
            <Card className="cursor-pointer" onClick={() => navigate("/users")}>
                <Title level={4}>Total Users</Title>
                <p className="text-2xl font-bold">{data?.totalUsers}</p>
            </Card>
            <Card className="cursor-pointer" onClick={() => navigate("/companies")}>
                <Title level={4}>Total Companies</Title>
                <p className="text-2xl font-bold">{data?.totalCompanies}</p>
            </Card>
        </div>
    );
};

export default Home;
