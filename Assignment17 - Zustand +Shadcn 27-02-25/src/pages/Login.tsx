// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchUserDetails, useLogin } from "../api";

// export default function Login() {
//     const navigate = useNavigate();

//     const [username, setUsername] = useState("mor_2314");
//     const [password, setPassword] = useState("83r5^_");
//     const [role, setRole] = useState("User");

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const response = await useLogin(username, password).mutateAsync();
//     };

//     return (
//         <div className="container d-flex justify-content-center align-items-center vh-100">
//             <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
//                 <h2 className="text-center">Login</h2>
//                 <form onSubmit={handleLogin}>
//                     <div className="mb-3">
//                         <label className="form-label">Username</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Enter username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Password</label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             placeholder="Enter password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Role</label>
//                         <select
//                             className="form-select"
//                             value={role}
//                             onChange={(e) => setRole(e.target.value)}
//                         >
//                             <option value="User">User</option>
//                             <option value="Admin">Admin</option>
//                         </select>
//                     </div>
//                     <button type="submit" className="btn btn-primary w-100">Login</button>
//                 </form>
//             </div>
//         </div>
//     );
// }
