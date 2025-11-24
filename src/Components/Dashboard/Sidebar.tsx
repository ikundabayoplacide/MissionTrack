import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../hook/useTheme";
import { VscHome } from "react-icons/vsc";
import { CiBellOn } from "react-icons/ci";
import { FiFileText, FiList, FiPlusCircle, FiUser, FiSettings } from "react-icons/fi";
import { BiWallet } from "react-icons/bi";

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const twTheme = (light: string, dark: string) =>
    theme === "light" ? light : dark;

  const navItems = [
    { icon: VscHome, label: "Dashboard", path: "/employee" },
    { icon: CiBellOn, label: "Notifications", path: "/employee/notifications" },
    { icon: FiUser, label: "Profile", path: "/employee/profileA" },
  ];

  const quickActions = [
    { icon: FiPlusCircle, label: "New Mission Request", path: "/employee/request" },
    { icon: FiList, label: "Request List/Tracking", path: "/employee/requestList" },
    { icon: BiWallet, label: "Expense Logging", path: "/employee/expenses" },
    { icon: FiFileText, label: "Mission Reporting", path: "/employee/report" },
  ];

  return (
    <div className="">
      <aside
        className={`hidden w-64 sm:fixed top-20 h-[calc(100vh-5rem)] left-0 sm:flex sm:flex-col shadow-md z-40 ${twTheme(
          "bg-blue-50",
          "bg-gray-900 text-white"
        )}`}
      >
        {/* Main content - scrollable */}
        <div className="flex-1 overflow-y-auto p-5">
          <nav className="space-y-2">
            {navItems.map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={label}
                  to={path}
                  className={`flex items-center text-sm font-bold gap-3 px-3 py-2 rounded-md transition-colors ${isActive
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

          <div className="mt-10">
            <p className="mb-3 ml-4 text-sm font-bold">Quick Actions</p>
            <div className="space-y-2">
              {quickActions.map(({ icon: Icon, label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className="flex items-center gap-2 px-2 py-1 text-md text-gray-600 hover:text-blue-600"
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
            to="settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === "/employee/settings"
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

export default Sidebar;