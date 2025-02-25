import React from "react";
import "./App.css";
import { GlobalProvider } from "./contexts/GlobalContext";
import Layout from "./pages/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Login from "./pages/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="home" element={<ProductList />} />
              <Route path="cart" element={<Cart />} />
              <Route path="product/:id" element={<ProductDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </QueryClientProvider>
  );
}

export default App;
