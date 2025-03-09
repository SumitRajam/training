import React, { useState } from "react";
import { Table, Input, Button, Space, Popconfirm, Select, Modal, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useCompanyStore from "../store/useCompanyStore";
import { useForm } from "react-hook-form";
import EditCompanyForm from "../components/EditCompanyForm";

const { Search } = Input;
const { Option } = Select;

export default function ManageCompanies() {
    const { companies, deleteCompany, updateCompany, addCompany } = useCompanyStore();
    const [searchText, setSearchText] = useState("");
    const [marketCapFilter, setMarketCapFilter] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCompany, setCurrentCompany] = useState<any>(null);
    const [isAddMode, setIsAddMode] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const filteredCompanies = companies.filter((company) => {
        const matchesSearch = company.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesMarketCap = marketCapFilter
            ? parseFloat(company.marketCap) >= parseFloat(marketCapFilter)
            : true;
        return matchesSearch && matchesMarketCap;
    });

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: any) => (
                <Link to={`${record.id}`} className="text-blue-500 hover:underline">
                    {text}
                </Link>
            ),
        },
        { title: "Address", dataIndex: "address", key: "address" },
        { title: "Zip", dataIndex: "zip", key: "zip" },
        { title: "Country", dataIndex: "country", key: "country" },
        { title: "Industry", dataIndex: "industry", key: "industry" },
        {
            title: "Market Cap", dataIndex: "marketCap", key: "marketCap",
            sorter: (a: any, b: any) => parseFloat(a.marketCap) - parseFloat(b.marketCap),
            sortDirections: ["ascend", "descend"],
        },
        { title: "CEO", dataIndex: "ceoName", key: "ceoName" },
        {
            title: "Actions",
            key: "actions",
            render: (record: any) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this company?"
                        onConfirm={() => deleteCompany(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleEdit = (company: any) => {
        setIsAddMode(false);
        setCurrentCompany(company);
        setIsModalOpen(true);
        reset(company);
    };

    const handleAdd = () => {
        setIsAddMode(true);
        setCurrentCompany(null);
        setIsModalOpen(true);
        reset();
    };

    const onSubmit = (data: any) => {
        if (isAddMode) {
            const newCompany = {
                ...data,
                marketCap: `${data.marketCap}`,
            };
            addCompany(newCompany);
            notification.success({
                message: "Company Added Successfully",
                description: `${data.name} has been added.`,
            });
        } else {
            const updatedCompany = {
                ...data,
                marketCap: `${data.marketCap}`,
            };
            updateCompany(currentCompany.id, updatedCompany);
            notification.success({
                message: "Company Updated Successfully",
                description: `${data.name}'s details have been updated.`,
            });
        }
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 container-fluid flex flex-col justiy-center align-center">
            <h1 className="text-2xl font-bold mb-4">Manage Companies</h1>
            <div className="flex gap-4 mb-4">
                <Search
                    placeholder="Search companies..."
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Select
                    placeholder="Filter by Market Cap"
                    style={{ width: 200 }}
                    onChange={(value) => setMarketCapFilter(value)}
                    allowClear
                >
                    <Option value="500000000">500M+</Option>
                    <Option value="700000000">700M+</Option>
                    <Option value="1000000000">1B+</Option>
                </Select>
                <Button onClick={handleAdd} type="primary">Add Company</Button>
            </div>
            <div className="container-fluid flex overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={filteredCompanies}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    bordered
                />
            </div>

            <Modal
                title={isAddMode ? "Add Company" : "Edit Company"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <EditCompanyForm
                    control={control}
                    errors={errors}
                    company={currentCompany}
                />
                <Button
                    type="primary"
                    onClick={handleSubmit(onSubmit)}
                    style={{ marginTop: 16 }}
                >
                    {isAddMode ? "Add Company" : "Save Changes"}
                </Button>
            </Modal>
        </div>
    );
}
