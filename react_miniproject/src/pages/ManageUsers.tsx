import React, { useState } from "react";
import { Table, Input, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const { Search } = Input;

export default function ManageUsers() {
    const { users, deleteUser } = useUserStore();
    const [searchText, setSearchText] = useState("");

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
    );

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
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        { title: "Company", dataIndex: "company", key: "company" },
        { title: "Address", render: (record: any) => `${record.address}, ${record.state}, ${record.country}`, key: "address" },
        {
            title: "Actions",
            key: "actions",
            render: (record: any) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => deleteUser(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleEdit = (user: any) => {
        console.log("Edit User:", user);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <Search
                placeholder="Search users..."
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16, width: 300 }}
            />
            <div className="constainer-fluid felx overflow-x-auto">
                <Table columns={columns} dataSource={filteredUsers} rowKey="id" pagination={{ pageSize: 5 }} bordered />
            </div>
        </div>
    );
}
