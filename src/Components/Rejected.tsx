// src/components/Rejected.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Select from "./Select";
import DragDrop from "./DragDrop";

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

  // Form state
  const [formData, setFormData] = useState({
    organizationName: "",
    province: "",
    district: "",
    sector: "",
    companyEmail: "",
    companyPhoneNumber: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileRemove = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const goToRegister = () => {
    navigate("/apply"); // replace with your registration route
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
            Some details need adjustment. Please review and resubmit your registration.
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
                options={formData.province ? districts[formData.province] : []}
                placeholder="District"
                onChange={handleChange}
                error={errors.district}
              />
              <Select
                label="Sector"
                name="sector"
                value={formData.sector}
                options={formData.district && sectors[formData.district] ? sectors[formData.district] : []}
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

          {/* DragDrop */}
          <div className="border mt-5 rounded-2xl p-6">
            <div className="resize-y overflow-auto min-h-[150px] border-2 border-dashed border-gray-400 rounded-md">
              <DragDrop onFileSelect={(files) => setUploadedFiles([...uploadedFiles, ...files])} />
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                <ul className="space-y-1 text-sm text-gray-600">
                  {uploadedFiles.map((file, idx) => (
                    <li key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleFileRemove(idx)}
                        className="text-red-500 text-xs hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {errors.files && <p className="text-red-500 text-sm">{errors.files}</p>}
          </div>

          {/* Go to Registration button */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={goToRegister}
              className="px-6 py-2 bg-primaryColor-700 text-white rounded-lg hover:bg-primaryColor-800"
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
