import React, { useState } from "react";
import Input from "../Input";
import { FiUser } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { FaBell, FaCalendar } from "react-icons/fa";
import Header from "../HeaderDash";
import Sidebar from "../Dashboard/Sidebar";
import { Link } from "react-router-dom";


const Password: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (formData.confirmNewPassword !== formData.newPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Password updated:", formData);
      // 🔑 Submit to backend here
    }
  };

  return (
    <>
     
        <div className="flex flex-col">
          <div className="h-[550px]  mt-10 flex bg-gradient-to-r    rounded-md shadow">
            <div className="flex flex-col w-full">
             
              {/* Header */}
              <div className="p-4 flex justify-between">
                <h1 className="text-xl font-semibold">Change Password</h1>
              </div>

              {/* Password fields */}
              <div className="p-5 w-1/2 flex flex-col gap-3">
                <Input
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  error={errors.currentPassword}
                />

                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  error={errors.newPassword}
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  error={errors.confirmNewPassword}
                />

                <button
                  onClick={handleSubmit}
                  className="mt-3 px-4 py-2 rounded bg-primaryColor-600 text-white"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Password;
