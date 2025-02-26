import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const { state } = useGlobalContext();
    const isAuthenticated = !!state.user?.id;
    const userRole = state.user?.role || "";

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        alert("You are not allowed to access this page");
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
