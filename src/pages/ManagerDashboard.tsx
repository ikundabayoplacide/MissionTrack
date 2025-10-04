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
      <HeaderManager onMenuClick={() => setMenuOpen(true)} />

      <div
        className={`flex gap-70 mt-20 ${twTheme(
          "bg-[#E6EAF5]",
          "bg-gray-900"
        )}`}
      >
        {/* Sidebar for large screens */}
        <div className="hidden sm:flex">
          <ManagerSideBar />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default ManagerDashboard;
