import React, { useState, useEffect } from "react";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, clearActionState } from "../../redux/profileSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { FiLock, FiShield, FiCheckCircle, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";

const Password: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.profile);

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

  const [successMessage, setSuccessMessage] = useState<string>("");

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));


    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSuccessMessage("");
    dispatch(clearActionState());
  };

  const handleSubmit = async () => {
    const newErrors: typeof errors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password";
    } else if (formData.confirmNewPassword !== formData.newPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await dispatch(changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword,
      })).unwrap();

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setSuccessMessage("Password updated successfully!");

    } catch (err: any) {
      console.error("Failed to change password:", err);
    }
  };




  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="w-full max-w-2xl">
        {/* Header Card */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6 border-b-2 border-blue-100">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl shadow-lg">
              <FiShield className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Change Password</h1>
              <p className="text-gray-500 text-sm mt-1">Keep your account secure with a strong password</p>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-start gap-3 animate-fade-in">
              <FiCheckCircle className="text-green-500 text-xl mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-800 font-medium">{successMessage}</p>
                <p className="text-green-600 text-sm mt-1">Your password has been updated successfully</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3 animate-fade-in">
              <FiAlertCircle className="text-red-500 text-xl mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Password Fields */}
          <div className="space-y-5">
            {/* Current Password */}
            <div className="relative">
              <Input
                label="Current Password"
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter your current password"
                error={errors.currentPassword}
                disabled={loading}
                icon={<FiLock className="text-gray-400" />}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition"
                disabled={loading}
              >
                {showCurrentPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <Input
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                error={errors.newPassword}
                disabled={loading}
                icon={<FiLock className="text-gray-400" />}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition"
                disabled={loading}
              >
                {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Input
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                error={errors.confirmNewPassword}
                disabled={loading}
                icon={<FiLock className="text-gray-400" />}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition"
                disabled={loading}
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-6 w-full px-6 py-3 rounded-xl font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating Password...
              </>
            ) : (
              <>
                <FiShield />
                Update Password
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Password;
