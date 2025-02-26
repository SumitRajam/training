import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../contexts/GlobalContext";
import { fetchUserDetails, fetchUserCart, fetchProductDetails } from "../api";

export default function Login() {
    const { dispatch } = useGlobalContext();
    const navigate = useNavigate();

    const [username, setUsername] = useState("mor_2314");
    const [password, setPassword] = useState("83r5^_");
    const [role, setRole] = useState("User");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://fakestoreapi.com/auth/login", {
                username: username,
                password: password
            });

            if (response.data?.token) {
                localStorage.setItem("token", response.data.token);

                try {
                    const tokenParts = response.data.token.split(".");
                    const payload = JSON.parse(atob(tokenParts[1]));
                    const userId = payload?.sub;
                    const userResponse = await fetchUserDetails(userId);
                    dispatch({ type: "SET_USER", payload: { ...userResponse, role } });
                    loadCart(userId);
                    navigate("/layout");

                } catch (error) {
                    if (error instanceof Error) {
                        alert(`Error decoding token: ${error.message}`);
                    } else {
                        alert("An unknown error occurred while decoding the token.");
                    }
                }
            } else {
                alert("Something went wrong.");
            }
        } catch (error) {
            if (error instanceof Error) {
                alert("Invalid credentials: " + error.message);
            } else {
                alert("An unknown error occurred.");
            }
        }
    };

    const loadCart = async (userId: number) => {
        try {
            const cart = await fetchUserCart(userId);
            const formattedCart = [];

            for (const { productId, quantity } of cart) {
                const product = await fetchProductDetails(productId);
                if (product) {
                    formattedCart.push({ ...product, quantity });
                }
            }

            dispatch({ type: "SET_CART", payload: formattedCart });
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
}
