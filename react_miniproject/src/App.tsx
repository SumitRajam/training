import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import ManageCompanies from "./pages/ManageCompanies";
import ManageUsers from "./pages/ManageUsers";
import UserDetails from "./pages/UserDetails";
import CompanyDetails from "./pages/CompanyDetails";
import Posts from "./pages/Posts";
import PostDetail from "./pages/Postdetail";


const App: React.FC = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={< AppLayout />} >
            <Route index element={<Home />} />
            <Route path="manage-users" element={< ManageUsers />} />
            <Route path="manage-users/:id" element={<UserDetails />} />
            <Route path="manage-companies" element={< ManageCompanies />} />
            <Route path="manage-companies/:id" element={<CompanyDetails />} />
            <Route path="posts" element={< Posts />} />
            <Route path="posts/:id" element={<PostDetail />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider >
  );
};

export default App;
