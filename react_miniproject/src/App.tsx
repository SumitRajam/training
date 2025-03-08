import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";


const App: React.FC = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={< AppLayout />} >
            <Route index element={<Home />} />
            <Route path="users" element={<h1>Users Page</h1>} />
            <Route path="settings" element={<h1>Settings Page</h1>} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider >
  );
};

export default App;
