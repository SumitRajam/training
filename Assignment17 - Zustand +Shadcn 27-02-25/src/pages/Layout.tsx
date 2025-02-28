import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar";

export default function Layout() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <Navbar />
                    <div className="p-4">
                        <Outlet />
                    </div>
                </main>
            </SidebarProvider>
        </>
    )
}
