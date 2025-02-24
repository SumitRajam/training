import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
import "../styles/Layout.css";
// import ProductList from '../components/ProductList';
import { Outlet } from 'react-router-dom'
import Navbar from "../components/Navbar";

export default function Layout() {

    return (
        <div className="layout">
            <Navbar />
            <Outlet />
        </div>
    );
}
