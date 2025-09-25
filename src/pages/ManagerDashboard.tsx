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

        {/* Main content */}
        <Outlet />
      </div>

      {/* Sidebar Modal for small screens */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sidebar Modal */}
          <div
            className={`relative w-64  h-full shadow-xl transform transition-transform duration-300`}
          >
            <ManagerSideBar />
            <button
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagerDashboard;
