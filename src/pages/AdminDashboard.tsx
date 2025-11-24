import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import HeaderAdmin from "../Components/Admin/HeaderAdmin";

const twTheme = (light: string, dark: string) => {
    return `${light} dark:${dark}`;
};

const AdminDashboard: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* Header with menu button */}
            <HeaderAdmin onMenuClick={() => setMenuOpen(prev => !prev)} />

            <div
                className={`flex mt-20 ${twTheme(
                    "bg-[#E6EAF5]",
                    "bg-gray-900"
                )}`}
            >
                {/* Sidebar for large screens */}
                <div className={menuOpen ? "block sm:flex" : "hidden sm:flex"}>
                    <AdminSidebar />
                </div>
                {/* Main content area */}
                <div className="flex-1 sm:ml-64 p-6">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
