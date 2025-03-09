import React from "react";
import { Form, Input, Button } from "antd";
import { Controller, UseFormReturn } from "react-hook-form";

interface EditUserFormProps {
    control: UseFormReturn["control"];
    handleSubmit: UseFormReturn["handleSubmit"];
    errors: any;
    onSubmit: (data: any) => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ control, handleSubmit, errors, onSubmit }) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Item label="Name" validateStatus={errors.name ? "error" : ""} help={errors.name?.message}>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter name" />}
                />
            </Form.Item>

            <Form.Item label="Username" validateStatus={errors.username ? "error" : ""} help={errors.username?.message}>
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: "Username is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter username" />}
                />
            </Form.Item>

            <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter email" />}
                />
            </Form.Item>

            <Form.Item label="Phone" validateStatus={errors.phone ? "error" : ""} help={errors.phone?.message}>
                <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Phone is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter phone number" />}
                />
            </Form.Item>

            <Form.Item label="Company" validateStatus={errors.company ? "error" : ""} help={errors.company?.message}>
                <Controller
                    name="company"
                    control={control}
                    rules={{ required: "Company is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter company name" />}
                />
            </Form.Item>

            <Form.Item label="Street Address" validateStatus={errors.address ? "error" : ""} help={errors.address?.message}>
                <Controller
                    name="address"
                    control={control}
                    rules={{ required: "Address is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter street address" />}
                />
            </Form.Item>

            <Form.Item label="State" validateStatus={errors.state ? "error" : ""} help={errors.state?.message}>
                <Controller
                    name="state"
                    control={control}
                    rules={{ required: "State is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter state" />}
                />
            </Form.Item>

            <Form.Item label="Country" validateStatus={errors.country ? "error" : ""} help={errors.country?.message}>
                <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Country is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter country" />}
                />
            </Form.Item>

            <Button type="primary" htmlType="submit">
                Save Changes
            </Button>
        </form>
    );
};

export default EditUserForm;
