import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderManager from "../manager/HeaderManager";
import ManagerSideBar from "../manager/ManagerSideBar";

const twTheme = (light: string, dark: string) => {
  return `${light} dark:${dark}`;
};

const ManagerDashboard: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Header with menu button */}
      <HeaderManager onMenuClick={() => setMenuOpen(prev => !prev)} />

      <div
        className={`flex min-h-[calc(100vh-5rem)] mt-20 ${twTheme(
          "bg-[#E6EAF5]",
          "bg-gray-900"
        )}`}
      >
        {/* Sidebar */}
        <div className={`z-40 ${menuOpen ? "block" : "hidden sm:block"}`}>
          <ManagerSideBar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 sm:ml-64 p-6 overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;
