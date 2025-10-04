import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../hook/useTheme";
import { useAuth } from "../../context/AuthContext";
import { VscHome } from "react-icons/vsc";
import { CiBellOn } from "react-icons/ci";
import { FiFileText, FiList, FiPlusCircle, FiUser } from "react-icons/fi";
import { BiWallet } from "react-icons/bi";

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
    <aside
      className={`fixed top-20 bottom-0 left-0 w-64 flex flex-col shadow-md z-40 ${twTheme(
        "bg-blue-50",
        "bg-gray-900 text-white"
      )}`}
    >
      <div className="flex-1 overflow-y-auto p-5">
    <nav className="space-y-2">
  {navItems.map(({ icon: Icon, label, path }) => {
    const isActive = location.pathname === path;
    return (
      <Link
        key={label}
        to={path}
        className={`flex items-center text-lg gap-3 px-3 py-2 rounded-md transition-colors 
          ${isActive
            ? "bg-gray-200 text-black font-bold"
            : twTheme(
              "text-gray-700 hover:bg-gray-100",
              "text-gray-300 hover:bg-gray-700"
            )
          }`}
      >
        <Icon size={20} className="text-black" />
        {label}
      </Link>
    );
  })}
</nav>


        <div className="mt-10">
          <p className="mb-3 ml-4 text-lg font-bold">Quick Actions</p>
          <div className="space-y-2">
            {quickActions.map(({ icon: Icon, label, path }) => (
              <Link
                key={label}
                to={path}
                className="flex items-center gap-2 px-2 py-1 text-lg text-gray-600 hover:text-blue-600"
              >
                <Icon size={18} className="text-black" />
                {label}
              </Link>
            ))}
          </div>
          <div className="pt-5">
            <button
              onClick={handleLogout}
              className="mt-10 w-32 bg-accent-600 text-white font-semibold py-2 rounded-2xl transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;