import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiLockKeyThin } from "react-icons/pi";

const UpdatePassword: React.FC = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

const send = async (newPassword: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Password being sent to backend:", newPassword);
      resolve(true);
    }, 1000);
  });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await send(password);
      setSuccess("✅ Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setErrors({ password: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-primaryColor-10 via-primaryColor-10 to-primaryColor-50 flex  gap-40 justify-center">
      {/* Left Side */}
      <div className=" flex flex-col justify-center items-center">
        <h2 className="text-primaryColor-800 font-bold text-2xl mb-4">
          Recover Your Password
        </h2>
        <p className="text-accent-800 mb-10">
          Choose a new password to secure your account.
        </p>
        <div className="mt-10">
          <img src="/rafiki.png" alt="illustration" className="w-96" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center justify-center pr-20">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <img src="/logo.svg" alt="logo" className="h-10 w-10" />
          <h1 className="font-bold text-xl">
            <span className="text-primaryColor-700">Mission</span>
            <span className="text-accent-700">Track.</span>
          </h1>
        </div>

        {/* Reset Password Card */}
        <div className="bg-white shadow-2xl rounded-2xl px-15 w-full max-w-md">
          <h2 className="text-2xl font-bold text-accent-600 text-center  ">
            Create New Password
          </h2>
          <p className="font-bold text-center mb-6">Choose a new password</p>

          {success && (
            <div className="mb-5 p-3 text-green-700 bg-green-100 border border-green-400 rounded-lg text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-5">
            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                New Password
              </label>
              <div className="relative mt-1">
                <PiLockKeyThin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700">
                Confirm New Password
              </label>
              <div className="relative mt-1">
                <PiLockKeyThin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-10 py-3 rounded-2xl font-semibold text-white shadow-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primaryColor-800"
              }`}
            >
              {loading ? "Updating..." : "Send"}
            </button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-5 mb-5 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-accent-500 hover:underline font-medium"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
