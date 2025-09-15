// src/components/ApplicationForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Example login, replace with your logic

  // One state object for all form values
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    phone: "",
    person: "",
    province: "",
    district: "",
    sector: "",
    organizationType: "",
    agree: false,
  });

  // Error + loading states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Rwandan administrative divisions
  const provinces = ["Kigali", "Northern", "Southern", "Eastern", "Western"];
  const districts = {
    Kigali: ["Gasabo", "Kicukiro", "Nyarugenge"],
    Northern: ["Musanze", "Gicumbi", "Burera"],
    Southern: ["Huye", "Nyanza", "Muhanga"],
    Eastern: ["Rwamagana", "Nyagatare", "Kayonza"],
    Western: ["Rusizi", "Rubavu", "Nyamasheke"],
  };
  const sectors = {
    Gasabo: ["Gikomero", "Kacyiru", "Kimironko"],
    Kicukiro: ["Nyarutarama", "Kanombe", "Gahanga"],
    Nyarugenge: ["Nyamirambo", "Kimisagara", "Muhima"],
    Musanze: ["Musanze", "Muhoza", "Kinigi"],
    // Add more as needed
  };
  const orgTypes = ["Non-profit", "Startup", "Corporate", "Governmental"];

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: typeof errors = {};

    if (!formData.organizationName) newErrors.organizationName = "Organization name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.person) newErrors.person = "Contact Person is required";
    if (!formData.province) newErrors.province = "Province is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.sector) newErrors.sector = "Sector is required";
    if (!formData.organizationType) newErrors.organizationType = "Organization type is required";
    if (!formData.agree) newErrors.agree = "You must agree to the terms & conditions";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      // Replace with your actual submission logic
      console.log(formData);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-r from-primaryColor-10 via-primaryColor-10 to-accent-10  gap-20 flex justify-center w-full">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-10">
        <h1 className="text-accent-800 text-3xl text-center font-bold mb-10">
          Enter Your Contacts and <br /> Organization Info for Registration
        </h1>
        <img src="bro.png" alt="illustration" className="w-96" />
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center justify-start pt-10">
        {/* Logo */}
        <div className="flex ">
          <img src="logo.svg" alt="logo" className="h-10 w-10" />
          <h1 className="font-bold text-xl ml-2">
            <span className="text-primaryColor-700">Mission</span>
            <span className="text-accent-700">Track.</span>
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md flex flex-col items-start text-left">
          <h2 className="text-xl font-bold text-accent-500 mb-6">
            New Organization Application Form
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4 w-full">
            <Input
              label="Organization Name"
              name="organizationName"
              value={formData.organizationName}
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              placeholder="Enter organization name"
              error={errors.organizationName}
            />

            <div className="grid grid-cols-3 gap-4">
              {/* Province */}
              <Select
                label="Province"
                name="province"
                value={formData.province}
                options={provinces}
                placeholder="Province"
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              />

              {/* District */}
              <Select
                label="District"
                name="district"
                value={formData.district}
                placeholder="District"
                options={formData.province ? districts[formData.province] : []}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              />

              {/* Sector */}
              <Select
                label="Sector"
                name="sector"
                value={formData.sector}
                placeholder="Sector"
                options={
                  formData.district && sectors[formData.district]
                    ? sectors[formData.district]
                    : []
                }
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Contact Person"
                name="person"
                value={formData.person}
                onChange={(e) => setFormData({ ...formData, person: e.target.value })}
                placeholder="Enter contact person name"
                type="text"
                error={errors.person}
              />

              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
                type="tel"
                error={errors.phone}
              />
            </div>

            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email"
              type="email"
              error={errors.email}
            />

            

            <div>
              <Checkbox
                label="I agree to the Terms & conditions"
                checked={formData.agree}
                onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
              />
              {errors.agree && (
                <p className="text-red-500 text-sm mt-1">{errors.agree}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primaryColor-700 text-white py-2 rounded-2xl hover:bg-primaryColor-800 mt-4"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
