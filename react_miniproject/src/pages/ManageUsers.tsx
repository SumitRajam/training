import React, { useState } from "react";
import { Table, Input, Button, Space, Popconfirm, Modal, notification } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useUserStore from "../store/useUserStore";
import EditUserForm from "../components/EditUserForm";

const { Search } = Input;

const ManageUsers: React.FC = () => {
    const { users, deleteUser, updateUser, addUser } = useUserStore();
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingUser, setIsAddingUser] = useState(false);
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
        setIsAddingUser(false);
        setCurrentUser(user);
        setIsModalOpen(true);

        reset({
            ...user,
            address: user.address.split(",")[0] || "",
            state: user.state || "",
            country: user.country || "",
        });
    };

    const handleAddUser = () => {
        setIsAddingUser(true);
        setCurrentUser(null);
        setIsModalOpen(true);

        reset({
            name: "",
            username: "",
            email: "",
            phone: "",
            company: "",
            address: "",
            state: "",
            country: "",
        });
    };

    const onSubmit = (data: any) => {
        const newUser = {
            ...data,
            address: `${data.address}, ${data.state}, ${data.country}`,
        };

        if (isAddingUser) {
            addUser(newUser);
            notification.success({
                message: "User Added Successfully",
                description: `${data.name} has been added.`,
            });
        } else {
            updateUser(currentUser.id, newUser);
            notification.success({
                message: "User Updated Successfully",
                description: `${data.name}'s details have been updated.`,
            });
        }

        setIsModalOpen(false);
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
            <div className="flex gap-2 mb-4">
                <Search
                    placeholder="Search users..."
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
                    Add User
                </Button>
            </div>
            <div className="container-fluid flex overflow-x-auto">
                <Table columns={columns} dataSource={filteredUsers} rowKey="id" pagination={{ pageSize: 5 }} bordered />
            </div>

            <Modal
                title={isAddingUser ? "Add User" : "Edit User"}
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
