
import React from "react";
import { FiUser, FiFileText, FiList, FiSettings } from "react-icons/fi";
import { VscHome } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hook/useTheme";
import { RiTeamLine } from "react-icons/ri";

const ManagerSidebar: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const twTheme = (light: string, dark: string) =>
    theme === "light" ? light : dark;

  // Sidebar navigation
  const navItems = [
    { icon: VscHome, label: "Dashboard", path: "/manager" },
    { icon: FiUser, label: "Profile", path: "/manager/profileA" },
  ];

  // Quick actions (fixed icons)
  const quickActions = [
    { icon: RiTeamLine, label: "All Mission", path: "/manager/all" },
    { icon: RiTeamLine, label: "Team Management", path: "/manager/team" },
    { icon: FiList, label: "Requests", path: "/manager/requested" },
    { icon: FiFileText, label: "Reports", path: "/manager/reported" },
  ];

  return (
    <div className="">
      <aside
        className={`fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] flex flex-col shadow-md z-40 ${twTheme(
          "bg-blue-50",
          "bg-gray-900 text-white"
        )}`}
      >
        {/* Main content - scrollable */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={label}
                  to={path}
                  className={`flex items-center text-lg font-bold gap-3 px-3 py-2 rounded-md transition-colors ${isActive
                    ? "bg-gray-200 text-black font-bold text-lg"
                    : twTheme(
                      "text-gray-700 hover:bg-gray-100",
                      "text-gray-300 hover:bg-gray-700"
                    )
                    }`}
                >
                  <Icon size={20} className={isActive ? "text-black" : "text-black"} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="mt-10">
            <p className="mb-3 ml-10 text-lg font-bold">Quick Actions</p>
            <div className="space-y-2">
              {quickActions.map(({ icon: Icon, label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-blue-600"
                >
                  <Icon size={18} className="text-black" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Settings at the bottom - always visible */}
        <div className={`p-5 border-t shrink-0 ${twTheme("border-gray-300", "border-gray-700")}`}>
          <Link
            to="/manager/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === "/manager/settings"
              ? "bg-gray-200 text-black font-bold"
              : twTheme(
                "text-gray-700 hover:bg-gray-100",
                "text-gray-300 hover:bg-gray-700"
              )
              }`}
          >
            <FiSettings size={22} className="text-black" />
            <span className="font-bold text-lg">Settings</span>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default ManagerSidebar;








