import React, { useState } from "react";
import { Table, Input, Button, Space, Popconfirm, Modal, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useUserStore from "../store/useUserStore";
import EditUserForm from "../components/EditUserForm";

const { Search } = Input;

const ManageUsers: React.FC = () => {
    const { users, deleteUser, updateUser } = useUserStore();
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleEdit = (user: any) => {
        setCurrentUser(user);
        setIsModalOpen(true);

        reset({
            ...user,
            address: user.address.split(",")[0] || "",
            state: user.state || "",
            country: user.country || "",
        });
    };

    const onSubmit = (data: any) => {
        const updatedUser = {
            ...data,
            address: `${data.address}, ${data.state}, ${data.country}`,
        };

        updateUser(currentUser.id, updatedUser);
        setIsModalOpen(false);

        notification.success({
            message: "User Updated Successfully",
            description: `${data.name}'s details have been updated.`,
        });
    };

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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <Search
                placeholder="Search users..."
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16, width: 300 }}
            />
            <div className="container-fluid flex overflow-x-auto">
                <Table columns={columns} dataSource={filteredUsers} rowKey="id" pagination={{ pageSize: 5 }} bordered />
            </div>

            <Modal
                title="Edit User"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <EditUserForm
                    control={control}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    onSubmit={onSubmit}
                />
            </Modal>
        </div>
    );
};

export default ManageUsers;
