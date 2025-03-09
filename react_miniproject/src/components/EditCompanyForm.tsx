import React from "react";
import { Form, Input } from "antd";
import { Controller, UseFormReturn } from "react-hook-form";

interface EditCompanyFormProps {
    control: UseFormReturn["control"];
    errors: any;
    company: any;
}


const EditCompanyForm: React.FC<EditCompanyFormProps> = ({ control, errors, company }) => {
    return (
        <form>
            <Form.Item label="Company Name" validateStatus={errors.name ? "error" : ""} help={errors.name?.message}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue={company?.name || ""}
                    rules={{ required: "Company name is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter company name" />}
                />
            </Form.Item>

            <Form.Item label="Address" validateStatus={errors.address ? "error" : ""} help={errors.address?.message}>
                <Controller
                    name="address"
                    control={control}
                    defaultValue={company?.address || ""}
                    rules={{ required: "Address is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter address" />}
                />
            </Form.Item>

            <Form.Item label="Zip" validateStatus={errors.zip ? "error" : ""} help={errors.zip?.message}>
                <Controller
                    name="zip"
                    control={control}
                    defaultValue={company?.zip || ""}
                    rules={{ required: "Zip code is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter zip code" />}
                />
            </Form.Item>

            <Form.Item label="Country" validateStatus={errors.country ? "error" : ""} help={errors.country?.message}>
                <Controller
                    name="country"
                    control={control}
                    defaultValue={company?.country || ""}
                    rules={{ required: "Country is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter country" />}
                />
            </Form.Item>

            <Form.Item label="Industry" validateStatus={errors.industry ? "error" : ""} help={errors.industry?.message}>
                <Controller
                    name="industry"
                    control={control}
                    defaultValue={company?.industry || ""}
                    rules={{ required: "Industry is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter industry" />}
                />
            </Form.Item>

            <Form.Item label="Market Cap" validateStatus={errors.marketCap ? "error" : ""} help={errors.marketCap?.message}>
                <Controller
                    name="marketCap"
                    control={control}
                    defaultValue={company?.marketCap || ""}
                    rules={{ required: "Market Cap is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter market cap" />}
                />
            </Form.Item>

            <Form.Item label="CEO" validateStatus={errors.ceoName ? "error" : ""} help={errors.ceoName?.message}>
                <Controller
                    name="ceoName"
                    control={control}
                    defaultValue={company?.ceoName || ""}
                    rules={{ required: "CEO name is required" }}
                    render={({ field }) => <Input {...field} placeholder="Enter CEO name" />}
                />
            </Form.Item>
        </form>
    );
};

export default EditCompanyForm;
