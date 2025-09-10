import React from "react";
import { CiBellOn } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { VscHome } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useTheme } from "../hook/useTheme";

const Sidebar: React.FC = () => {
  const { theme } = useTheme();

  const twTheme = (light: string, dark: string) =>
    theme === "light" ? light : dark;

  // Sidebar navigation
  const navItems = [
    { icon: VscHome, label: "Dashboard", path: "/dashboard" },
    { icon: CiBellOn, label: "Notifications", path: "/notifications" },
    { icon: FiUser, label: "Profile", path: "/profile" },
  ];

  // Quick actions
  const quickActions = [
    { icon: VscHome, label: "New Mission Request", path: "/request" },
    { icon: VscHome, label: "Manage Missions", path: "/missions/manage" },
    { icon: VscHome, label: "Mission History", path: "/missions/history" },
  ];

  return (
    <aside
      className={`w-64 p-5 h-screen shadow-md ${twTheme("bg-white text-black", "bg-gray-800 text-white")}`}
    >
      {/* Navigation */}
      <nav className="space-y-3">
        {navItems.map(({ icon: Icon, label, path }) => (
          <div
            key={label}
            className={`flex gap-3 items-center p-2 rounded ${twTheme(
              "bg-white text-black hover:bg-gray-100",
              "bg-gray-800 text-white hover:bg-gray-700"
            )}`}
          >
            <Icon size={20} className="text-blue-500" />
            <Link to={path} className="font-bold">
              {label}
            </Link>
          </div>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="mt-10">
        <p className="font-bold mb-3">Quick Actions</p>
        <div className="space-y-3">
          {quickActions.map(({ icon: Icon, label, path }) => (
            <div key={label} className="flex gap-2 items-center text-sm">
              <Icon size={20} className="text-blue-500" />
              <Link to={path} className="text-sm">
                {label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <Link
        to="/login"
        className="bg-orange-500 mt-20 text-white p-2 rounded-2xl text-center text-xl w-32 block "
      >
        Logout
      </Link>
    </aside>
  );
};

export default Sidebar;
