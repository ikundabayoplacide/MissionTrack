import React, { useState } from "react";
import Input from "../Input";
import { FaBell, FaCalendar, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Header from "../HeaderDash";
import Sidebar from "../Dashboard/Sidebar";




const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    role?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // simple validation example
    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.role) newErrors.role = "Role is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Profile submitted:", formData);
      // submit to backend here
    }
  };

  return (
    <>
      <Header />
      <div className="flex gap-12">
        <Sidebar />
        <div className="flex flex-col min-h-screen  w-full bg-[#E6EAF5] mt-20">
          <div className="w-[1200px] py-2 mt-5 ml-64 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
            <h1 className="font-bold text-2xl text-center">
              Manage your information and preferences
            </h1>
          </div>
          <div className="h-[400px] w-[1200px] ml-65 mt-10 flex  bg-white rounded-md shadow">


            <div className="flex flex-col w-full">
              {/* Top navigation with full-width border */}
              <div className="border-b border-gray-300 w-full">
                <div className="h-15 py-5">
                  <div className="flex gap-15">
                    <Link
                      to={"/details"}
                      className="flex items-center gap-1 border-b-2 p-2 border-transparent hover:border-blue-600 transition-all duration-300 -mb-[2px]"
                    >
                      <FiUser size={20} />
                      <span>Personal Information</span>
                    </Link>


                    <Link to={"/password"}
                      className="flex items-center gap-1 border-b-2 p-2 border-transparent hover:border-blue-600 transition-all duration-300 -mb-[2px]"
                    >
                      <MdLockOutline size={20} />
                      <span>Password</span>
                    </Link>

                    <Link to={'/preferences'}
                      className="flex items-center gap-1 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300 -mb-[2px]"
                    >
                      <FaBell size={20} />
                      <span>Notifications</span>
                    </Link>

                    <a
                      href=""
                      className="flex items-center gap-1 border-b-2 p-2 border-transparent hover:border-blue-600 transition-all duration-300 -mb-[2px]"
                    >
                      <FaCalendar size={20} />
                      <span>Calendar</span>
                    </a>
                  </div>
                </div>
              </div>


              {/* Content header */}
              <div className="p-4 flex justify-between">
                <h1 className="text-xl font-semibold">Personal Information</h1>
                <button
                  onClick={handleSubmit}
                  className=" px-4 py-2 rounded bg-blue-600 text-white"
                >
                  Save Changes
                </button>
              </div>

              {/* First row */}
              <div className="p-5 grid grid-cols-2 gap-6">
                <Input
                  label="Full Names"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  error={errors.fullName}
                  icon={<FiUser />}
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  error={errors.email}
                  icon={<FaEnvelope />}
                />
              </div>

              {/* Second row */}
              <div className="p-5 grid grid-cols-2 gap-6">
                <Input
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="0788888888"
                  error={errors.phoneNumber}
                  icon={<FaPhoneAlt />}
                />

                <Input
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Employee"
                  error={errors.role}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
