import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const getCookie = (name: string) => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find(row => row.startsWith(name + "="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
};

const ProtectedRoute: React.FC = () => {
    const token = getCookie("mini_token");

    return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
