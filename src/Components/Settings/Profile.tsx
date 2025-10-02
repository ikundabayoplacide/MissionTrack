import React, { useState } from "react";
import Input from "../Input";
import { FaBell, FaCalendar, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
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
     
        <div className="flex flex-col min-h-screen  w-full bg-[#E6EAF5] pr-5">
          {/* <div className="w-[900px] py-2 mt-5  bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
            <h1 className="font-bold text-2xl text-center">
              Manage your information and preferences
            </h1>
          </div> */}
          <div className="h-full mt-2 flex  bg-white rounded-md shadow">


            <div className="flex flex-col w-full">
              {/* Top navigation with full-width border */}
              <div className="border-b border-gray-300 w-full">
                <div className="h-15 py-5">
                  <div className="flex gap-15">
                    <Link
                      to={"profileA"}
                      className="flex items-center gap-1 border-b-2 p-2 border-transparent hover:border-blue-600 transition-all duration-300 -mb-[2px]"
                    >
                      <FiUser size={20} />
                      <span>Personal Information</span>
                    </Link>


                    <Link to={"passwordA"}
                      className="flex items-center gap-1 border-b-2 p-2 border-transparent hover:border-blue-600 transition-all duration-300 -mb-[2px]"
                    >
                      <MdLockOutline size={20} />
                      <span>Password</span>
                    </Link>

                    <Link to={'preferencea'}
                      className="flex items-center gap-1 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300 -mb-[2px]"
                    >
                      <FaBell size={20} />
                      <span>Preferences</span>
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
             <Outlet/>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Profile;
