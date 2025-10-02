import React from "react";
import { CiBellOn } from "react-icons/ci";
import { FiUser, FiFileText, FiList, FiPlusCircle } from "react-icons/fi";
import { VscHome } from "react-icons/vsc";
import { BiWallet } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../hook/useTheme";
import { useAuth } from "../../context/AuthContext";

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear user + token
    navigate("/login"); // redirect
  };

  const twTheme = (light: string, dark: string) =>
    theme === "light" ? light : dark;

  // Sidebar navigation
  const navItems = [
    { icon: VscHome, label: "Dashboard", path: "/employee" },
    { icon: CiBellOn, label: "Notifications", path: "employee/notifications" },
    { icon: FiUser, label: "Profile", path: "/profileA" },
  ];

  // Quick actions
  const quickActions = [
    { icon: FiPlusCircle, label: "New Mission Request", path: "employee/request" },
    { icon: FiList, label: "Request List/Tracking", path: "employee/requestList" },
    { icon: BiWallet, label: "Expense Logging", path: "employee/expenses" },
    { icon: FiFileText, label: "Mission Reporting", path: "employee/report" },
  ];

  return (
    <aside
      className={`fixed top-20 h-full left-0  w-64 flex flex-col justify-between shadow-md z-40 overflow-y-auto ${twTheme(
        "bg-blue-50",
        "bg-gray-900 text-white"
      )}`}
    >
      <div className="p-5">
        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <Link
                key={label}
                to={path}
                className={`flex items-center text-lg gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-200 text-black font-bold"
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
          <p className="mb-3 ml-4 text-lg font-bold">Quick Actions</p>
          <div className="space-y-2">
            {quickActions.map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname.startsWith(path);
              return (
                <Link
                  key={label}
                  to={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-gray-200 text-black font-semibold"
                      : twTheme(
                          "text-gray-600 hover:text-blue-600",
                          "text-gray-300 hover:bg-gray-700"
                        )
                  }`}
                >
                  <Icon size={18} className="text-black" />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ✅ Logout always at bottom */}
      <div className="p-5">
        <button
          onClick={handleLogout}
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-2xl transition hover:bg-green-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
