import React from "react";
import { FiBell, FiUser, FiMenu } from "react-icons/fi"; 
import { useTheme } from "../hook/useTheme";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface HeaderProps {
  onMenuClick?: () => void; 
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme } = useTheme();
  const { user } = useAuth();

  

  const twTheme = (light: string, dark: string) =>
    theme === "light" ? light : dark;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-20 border-b ${twTheme(
        "bg-white border-gray-200",
        "bg-gray-800 border-gray-700"
      )}`}
    >
      {/* Logo + Title + Mobile Menu Button */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu Button (hidden on md+) */}
        {onMenuClick && (
          <button
            className="md:hidden p-2 text-gray-700 dark:text-gray-200"
            onClick={onMenuClick}
          >
            <FiMenu size={24} />
          </button>
        )}
        <img src="/logo.svg" alt="logo" className="h-8" />
        <h1 className="font-bold text-xl text-primaryColor-700">
          Mission<span className="text-accent-700">Track</span>
        </h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <Link to={"/notifications"} className="relative mr-4">
          <FiBell
            size={22}
            className={twTheme("text-gray-700", "text-gray-200")}
          />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            4
          </span>
        </Link>

        {/* Profile */}
        <div className="flex items-center mr-15 gap-2 cursor-pointer">
           <img src={user?.profilePhoto || "/src/assets/profile.jpg"}alt="Profile" className="w-12 h-12 rounded-full object-cover" />
          <span className="text-sm font-medium">{user?.fullName || "Employee"}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
