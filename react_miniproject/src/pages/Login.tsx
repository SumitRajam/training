import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Card, Typography, message } from "antd";
import Cookies from "js-cookie";
import { useLogin } from "../api";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
    username: string;
    password: string;
};

const { Title } = Typography;

const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("mini_token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        mode: "onBlur",
    });

    const loginMutation = useLogin();

    const onSubmit = (data: LoginFormInputs) => {
        loginMutation.mutate(data, {
            onSuccess: (response) => {
                if (response?.token) {
                    Cookies.set("mini_token", response.token, { expires: 1 });
                    message.success("Login successful!");
                    navigate("/dashboard");
                } else {
                    message.error("Invalid credentials.");
                }
            },
            onError: (error) => {
                message.error("Login failed. Please try again.");
                console.error("Login Error:", error);
            },
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <Card className="w-full max-w-md shadow-lg rounded-lg p-6 bg-white">
                <Title level={3} className="text-center mb-6 text-gray-800">Login</Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Username Field */}
                    <Form.Item label="Username" validateStatus={errors.username ? "error" : ""} help={errors.username?.message}>
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: "Username is required" }}
                            render={({ field }) => <Input {...field} placeholder="Enter your username" size="large" />}
                        />
                    </Form.Item>

                    {/* Password Field */}
                    <Form.Item label="Password" validateStatus={errors.password ? "error" : ""} help={errors.password?.message}>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Password is required" }}
                            render={({ field }) => <Input.Password {...field} placeholder="Enter your password" size="large" />}
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Button type="primary" htmlType="submit" className="w-full" size="large" loading={loginMutation.isPending}>
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default LoginForm;
