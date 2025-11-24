// src/components/Rejected.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "./Input";
import Select from "./Select";
// import DragDrop from "./DragDrop"; // removed unused import
import { useAuth } from "../context/AuthContext";

// ------------------- Constants -------------------
const provinces = ["Kigali", "Northern", "Southern", "Eastern", "Western"];

const districts: Record<string, string[]> = {
  Kigali: ["Gasabo", "Kicukiro", "Nyarugenge"],
  Northern: ["Musanze", "Gicumbi", "Burera"],
  Southern: ["Huye", "Nyanza", "Muhanga"],
  Eastern: ["Rwamagana", "Nyagatare", "Kayonza"],
  Western: ["Rusizi", "Rubavu", "Nyamasheke"],
};

const sectors: Record<string, string[]> = {
  Gasabo: ["Gikomero", "Kacyiru", "Kimironko"],
  Kicukiro: ["Nyarutarama", "Kanombe", "Gahanga"],
  Nyarugenge: ["Nyamirambo", "Kimisagara", "Muhima"],
  Musanze: ["Musanze", "Muhoza", "Kinigi"],
};

const Rejected: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // ✅ Get formData passed from Login
  const previousData = location.state?.formData || {};

  const [formData, setFormData] = useState({
    organizationName: previousData.organizationName || "",
    province: previousData.province || "",
    district: previousData.district || "",
    sector: previousData.sector || "",
    companyEmail: previousData.companyEmail || user?.email || "",
    companyPhoneNumber: previousData.companyPhoneNumber || user?.phoneNumber || "",
  });
  const [errors] = useState<any>({}); // setErrors unused, removed
  // uploadedFiles and setUploadedFiles removed as unused

  // ✅ Fetch company info when rejected
  useEffect(() => {
    if (user?.companyId && user?.token) {
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}/companies/${user.companyId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            organizationName: data.organizationName || "",
            province: data.province || "",
            district: data.district || "",
            sector: data.sector || "",
            companyEmail: data.companyEmail || user?.email || "",
            companyPhoneNumber: data.companyPhoneNumber || user?.phoneNumber || "",
          });
        })
        .catch((err) => console.error("Failed to fetch company:", err));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileRemove = (index: number) => {
  //   setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  // }; // removed unused function

  const goToRegister = () => {
    // ✅ Pass formData forward if you want to keep it on /apply too
    navigate("/apply", { state: { formData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primaryColor-10 via-primaryColor-10 to-accent-10 flex justify-center gap-20 w-full">
      {/* Left side illustration */}
      <div className="flex flex-col justify-center items-center p-10">
        <h1 className="text-accent-800 text-3xl text-center font-bold mb-10">
          Enter Your Contacts and <br /> Organization Info for Registration
        </h1>
        <img src="bro.png" alt="illustration" className="w-96" />
      </div>

      {/* Right side form */}
      <div className="flex flex-col items-center justify-start pt-10">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-[600px] min-h-screen flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center pb-4">
            <h2 className="text-xl font-bold text-green-600">
              Registration Not Approved
            </h2>
          </div>

          {/* Rejection alert */}
          <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-center space-x-2 my-4">
            <p className="text-sm">
              Some details need adjustment. Please review and resubmit your
              registration.
            </p>
          </div>

          {/* Form first step */}
          <form className="p-6 space-y-4">
            <h1 className="text-xl">Company/Organisation's information</h1>
            <div className="border rounded-2xl p-6">
              <Input
                label="Organization Name"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Enter organization name"
                error={errors.organizationName}
              />
              <div className="grid grid-cols-3 gap-4">
                <Select
                  label="Province"
                  name="province"
                  value={formData.province}
                  options={provinces}
                  placeholder="Province"
                  onChange={handleChange}
                  error={errors.province}
                />
                <Select
                  label="District"
                  name="district"
                  value={formData.district}
                  options={
                    formData.province ? districts[formData.province] : []
                  }
                  placeholder="District"
                  onChange={handleChange}
                  error={errors.district}
                />
                <Select
                  label="Sector"
                  name="sector"
                  value={formData.sector}
                  options={
                    formData.district && sectors[formData.district]
                      ? sectors[formData.district]
                      : []
                  }
                  placeholder="Sector"
                  onChange={handleChange}
                  error={errors.sector}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Company Email"
                  name="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  placeholder="Enter company email"
                  error={errors.companyEmail}
                />
                <Input
                  label="Company Phone"
                  name="companyPhoneNumber"
                  value={formData.companyPhoneNumber}
                  onChange={handleChange}
                  placeholder="Enter company phone number"
                  error={errors.companyPhoneNumber}
                />
              </div>
            </div>

            {/* Go to Registration button */}
            <div className="flex justify-center gap-10 mt-4">
              <button
                type="button"
                onClick={goToRegister}
                className="w-full py-1 bg-white border-2 text-red-600 border-red-600 rounded-lg hover:bg-red-600 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={goToRegister}
                className="w-full py-1 bg-accent-600 text-white rounded-lg hover:transparent hover:border"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Rejected;
