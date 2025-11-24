import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiUser, FiMenu } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useTheme } from "../hook/useTheme";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const twTheme = (light: string, dark: string) =>
    theme === "light" ? light : dark;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="rounded-full p-1">
              <img
                src={user?.profilePhoto || "/default-avatar.png"}
                alt="User Avatar"
                className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
              />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold">{user?.fullName || "Employee"}</p>
              <p className="text-xs text-gray-500">{user?.role || "Employee"}</p>
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border ${twTheme(
              "bg-white border-gray-200",
              "bg-gray-800 border-gray-700"
            )}`}>
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold text-sm">{user?.fullName || "Employee"}</p>
                <p className="text-xs text-gray-500">{user?.email || "employee@example.com"}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">
                  {user?.role?.toUpperCase() || "EMPLOYEE"}
                </p>
              </div>

              <div className="py-2">
                <Link
                  to="/employee/profileA"
                  className={`flex items-center gap-3 px-4 py-2 text-sm ${twTheme(
                    "hover:bg-gray-100 text-gray-700",
                    "hover:bg-gray-700 text-gray-200"
                  )}`}
                  onClick={() => setDropdownOpen(false)}
                >
                  <FiUser size={18} />
                  <span>View Profile</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 ${twTheme(
                    "hover:bg-red-50",
                    "hover:bg-gray-700"
                  )}`}
                >
                  <MdLogout size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
