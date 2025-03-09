import React from "react";
import { useParams } from "react-router-dom";
import { Card, Spin, Typography } from "antd";
import { useCompanyDetails } from "../api";

const { Title } = Typography;

export default function CompanyDetails() {
    const { id } = useParams<{ id: string }>();
    const companyId = Number(id);
    const { data: company, isLoading, error } = useCompanyDetails(companyId);

    if (isLoading) {
        return <Spin size="large" className="flex justify-center items-center min-h-screen" />;
    }

    if (error) {
        return <p className="text-red-500 text-center">Error fetching company details</p>;
    }

    return (
        <div className="p-6 flex justify-center">
            <Card className="max-w-lg w-full">
                <Title level={3}>{company?.name}</Title>
                <p><strong>Industry:</strong> {company?.industry}</p>
                <p><strong>Market Cap:</strong> {company?.marketCap}</p>
                <p><strong>Employee Count:</strong> {company?.employeeCount}</p>
                <p><strong>CEO:</strong> {company?.ceoName}</p>
                <p><strong>Address:</strong> {company?.address}, {company?.country} - {company?.zip}</p>
                <p><strong>Domain:</strong> <a href={`https://${company?.domain}`} target="_blank" rel="noopener noreferrer">{company?.domain}</a></p>
            </Card>
        </div>
    );
}
