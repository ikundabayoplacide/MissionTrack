import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa6";

const RecoverPassword: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [loading, setLoading] = useState(false);

  // Mock API: returns a fake reset token
  const send = async (email: string) => {
    return new Promise<{ token: string }>((resolve) => {
      setTimeout(() => {
        console.log("Sending reset link to:", email); 
        resolve({ token: "mock-reset-token-123" });
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Enter a valid email address";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await send(email);
      // ✅ Navigate to update password page with token
      navigate(`/reset-password/${res.token}`);
    } catch (err: any) {
      setErrors({ email: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center gap-40 bg-gradient-to-r from-primaryColor-10 via-primaryColor-10 to-primaryColor-50 ">
      {/* Left Side */}
      <div className=" flex flex-col justify-center items-center ">
        <h2 className="text-primaryColor-800 font-bold text-3xl mb-4">
          Recover Your Password
        </h2>
        <p className="text-accent-700 font-semibold mb-10 ">
          We’ll help you get back in quickly. Just enter your <br /> email to
          receive a reset link.
        </p>
        <div className="mt-10">
          <img src="rafiki.png" alt="illustration" className="w-96" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center justify-center pr-20  ">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <img src="logo.svg" alt="logo" className="h-10 w-10" />
          <h1 className="font-bold text-xl">
            <span className="text-primaryColor-700">Mission</span>
            <span className="text-accent-700">Track.</span>
          </h1>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-accent-600 text-center mb-15">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <div className="relative mt-1">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
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

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-5 py-3 rounded-2xl font-semibold text-white shadow-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primaryColor-800 "
              }`}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-10 text-center">
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

export default RecoverPassword;
