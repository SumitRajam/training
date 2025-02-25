import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Layout.css";

export default function Layout() {

    return (
        <div className="layout">
            <Navbar />
            <Outlet />
        </div>
    );
}
