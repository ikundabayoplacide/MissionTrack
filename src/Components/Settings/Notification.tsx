import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { FaBell, FaCalendar } from "react-icons/fa";
import Header from "../HeaderDash";
import Sidebar from "../Dashboard/Sidebar";
import { Link } from "react-router-dom";

interface NotificationItemProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, description, checked, onChange }) => (
  <div className="p-3 rounded-lg shadow-sm flex items-center justify-between w-full mx-auto">
    <div>
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-800">{description}</p>
    </div>

    {/* Toggle Switch */}
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer peer-checked:translate-x-5 transition"></div>
    </label>
  </div>
);

const Notification: React.FC = () => {
  const [preferences, setPreferences] = useState({
    email: true,
    push: false,
    mission: true,
    budget: false,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = () => {
    console.log("Saved Preferences:", preferences);
    // TODO: Send to backend API
  };

  return (
    <>
    
        <div className="h-[600px] bg-gradient-to-br to-accent-10/50 rounded-md shadow">
          <div className="flex flex-col w-full">
            

            {/* Header */}
            <div>
              <div className="p-4 flex justify-between">
                <h1 className="text-xl font-semibold">Notification Preferences</h1>
              </div>

              {/* Notification Settings */}
              <div className="flex flex-col gap-4">
                <NotificationItem
                  title="Email Notification"
                  description="Receive notification via Email"
                  checked={preferences.email}
                  onChange={() => handleToggle("email")}
                />
                <NotificationItem
                  title="Push Notification"
                  description="Receive push notifications"
                  checked={preferences.push}
                  onChange={() => handleToggle("push")}
                />
                <NotificationItem
                  title="Mission Status"
                  description="Get notified when mission status changes"
                  checked={preferences.mission}
                  onChange={() => handleToggle("mission")}
                />
                <NotificationItem
                  title="Budget Alerts"
                  description="Receive alerts about budgets"
                  checked={preferences.budget}
                  onChange={() => handleToggle("budget")}
                />

                <button
                  onClick={handleSubmit}
                  className="mt-3 ml-7 px-4 w-[250px] py-2 rounded bg-primaryColor-800 text-white hover:bg-primaryColor-700"
                >
                  Save Preferences
                </button>
              </div>

            </div>
          </div>
        </div>
    </>
  );
};

export default Notification;
