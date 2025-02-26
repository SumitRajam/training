import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from './pages/ProductList'
import Layout from './pages/Layout';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={< Layout />} >
              <Route index element={<ProductList />} />
              <Route path="home" element={<ProductList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
