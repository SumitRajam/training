import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from './pages/ProductList'
import Layout from './pages/Layout';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from './pages/ProductDetails';
import UpdateProducts from './pages/UpdateProducts';
import CartComponent from './pages/cartComponent';

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={< Layout />} >
              <Route index element={<ProductList />} />
              <Route path="home" element={<ProductList />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="update products" element={<UpdateProducts />} />
              <Route path="cart" element={<CartComponent />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
