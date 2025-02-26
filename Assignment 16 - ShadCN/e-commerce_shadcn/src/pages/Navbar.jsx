import React from 'react'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <div>
            <nav className="bg-violet-800 text-white p-4 shadow-md w-full">
                <div className="flex justify-start">
                    <SidebarTrigger />
                    <Link to="/" className="text-xl font-bold">
                        BrandName
                    </Link>
                </div>
            </nav>
        </div>
    )
}
