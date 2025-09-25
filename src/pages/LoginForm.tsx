import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";


const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const newErrors: { email?: string; password?: string } = {};

  // Email validation
  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
  }

  // Password validation
  if (!password.trim()) {
    newErrors.password = "Password is required";
  } else if (password.trim().length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  setLoading(true);

  try {
    const res = await login(email, password);

    // ✅ Save token + userId to localStorage for later requests
    if (res?.token) {
      localStorage.setItem("token", res.token);
    }
    if (res?.user?.id) {
      localStorage.setItem("userId", res.user.id);
    }

    if (res?.user?.role === "manager") {
      try {
        // ✅ token comes from res.token (not res.user.token)
        const base64Url = res.token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(base64));

        const companyStatus = payload.companyStatus; // 👈 comes from token

        if (companyStatus === "pending") {
          navigate("/pending");
        } else if (companyStatus === "rejected") {
          navigate("/rejected", { state: { formData: res.user } });
          // 👆 pass old company data for resubmission
        } else if (companyStatus === "approved") {
          navigate("/manager");
        } else {
          navigate("/manager"); // fallback
        }
      } catch (err) {
        console.error("Failed to decode token", err);
        navigate("/manager"); // fallback
      }
    } else if (res?.user?.role === "employee") {
      navigate("/employee");
    } else if (res?.user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/login"); // fallback
    }
  } catch (err: any) {
    setErrors({ password: err.message });
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-r from-primaryColor-10 via-primaryColor-10 to-primaryColor-50  flex justify-center gap-40  ">
      {/* Left Side */}
      <div className="  flex flex-col justify-center  items-center">
        <h2 className="text-primaryColor-800 font-bold text-2xl ">
          Stay Organized, Stay Ahead
        </h2>
        <p className="text-accent-800 mb-10 ">
          Sign in to submit new requests or follow up on <br/> approvals all in one
          place.
        </p>
        <div className="mt-10">
          <img src="pana.png" alt="illustration" className="w-96" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center justify-center  pr-20 ">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-5 ">
          <img src="logo.svg" alt="logo" className="h-10 w-10" />
          <h1 className="font-bold text-xl">
            <span className="text-primaryColor-700">Mission</span>
            <span className="text-accent-700">Track.</span>
          </h1>
        </div>

        {/* Login Card */}
        <div className="bg-white shadow-2xl rounded-2xl px-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-accent-700 text-center mb-15">
            Welcome
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <div className="relative mt-1">
                <FaEnvelope className="absolute left-4 top-1/2  -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-12 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500"
                >
                  <BiSolidShow />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-15 py-3 rounded-2xl font-semibold text-white shadow-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="mt-5 mb-5 text-center">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-accent-500 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
