import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { registerCompany, resetCompanyState } from "../redux/companySlice";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import Select from "./Select";
import Stepper from "./Stepper";
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

const ApplicationFormRight: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

  const { loading, success, error, message } = useSelector(
    (state: RootState) => state.company
  );
 useEffect(() => {
    if (success) {
      navigate("/admin/companies"); 
      dispatch(resetCompanyState()); 
    }
  }, [success, dispatch, navigate]);

  // ------------------- State -------------------
  const [formData, setFormData] = useState<any>({
    companyName: "",
    companyEmail: "",
    companyContact: "",
    province: "",
    district: "",
    sector: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [step, setStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // ------------------- Handlers -------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleFileRemove = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 0) {
      if (!formData.companyName)
        newErrors.companyName = "Organization name is required";
      if (!formData.province) newErrors.province = "Province is required";
      if (!formData.district) newErrors.district = "District is required";
      if (!formData.sector) newErrors.sector = "Sector is required";
      if (!formData.companyEmail)
        newErrors.companyEmail = "Company email is required";
      if (!formData.companyContact)
        newErrors.companyContact = "Company phoneNumber  is required";
    }

    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = "Contact fullName is required";
      if (!formData.phoneNumber) newErrors.phoneNumber = "phoneNumber is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (uploadedFiles.length === 0)
        newErrors.files = "Please upload at least one file";
    }

    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setStep(step + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep(step - 1);
  };

  // ------------------- Submit -------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateStep();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
   const data = new FormData();
    Object.keys(formData).forEach((key) => {
    data.append(key, formData[key]);
  });
   uploadedFiles.forEach((file) => {
    data.append("proofDocument", file); 
  });

    dispatch(registerCompany(data));
  };

  return (
    <div className="flex flex-col items-center justify-start pt-10">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[600px] min-h-screen flex flex-col">
        {/* Success / Error */}
        {success && (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* Stepper */}
        <div className="max-w-md mx-auto mb-4">
          <Stepper
            steps={["Company Info", "Representative", "Confirmation"]}
            currentStep={step}
          />
        </div>

        {/* Multi-Step Form */}
        <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
          {/* --- Step 0: Company Info --- */}
           {/* Step 0 */}
           {step === 0 && (
              <div>
                <div className="mb-4 text-xl">
                  <h1>Company/Organization’s Information</h1>
                </div>
                <div className="rounded-2xl border p-6 space-y-4">
                  <Input
                    label="Organization Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter organization name"
                    error={errors.companyName}
                  />

                  {/* Location */}
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
                      placeholder="District"
                      options={formData.province ? districts[formData.province] : []}
                      onChange={handleChange}
                      error={errors.district}
                    />
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
                      onChange={handleChange}
                      error={errors.sector}
                    />
                  </div>

                  {/* Company Contact */}
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
                      label="phoneNumber "
                      name="companyContact"
                      value={formData.companyContact}
                      onChange={handleChange}
                      placeholder="Enter company phoneNumber "
                      error={errors.companyContact}
                    />
                  </div>
                </div>

                {/* DragDrop uploader */}
                <div className="border mt-5 rounded-2xl p-6">
                  <div className="resize-y overflow-auto min-h-[150px] border-2 border-dashed border-gray-400 rounded-md">
                    <DragDrop
                      onFileSelect={(files) =>
                        setUploadedFiles([...uploadedFiles, ...files])
                      }
                    />
                  </div>

                  {/* Preview uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <h4 className="font-medium text-sm text-gray-700">
                        Uploaded Files:
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {uploadedFiles.map((file, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-between bg-gray-50 p-2 rounded"
                          >
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
                  {errors.files && (
                    <p className="text-red-500 text-sm">{errors.files}</p>
                  )}
                </div>
              </div>
            )}

          {/* --- Step 1: Representative --- */}
           {step === 1 && (
              <>
                <Input
                  label="Contact fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter contact fullName name"
                  error={errors.fullName}
                />

                <Input
                  label="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phoneNumber "
                  type="tel"
                  error={errors.phoneNumber}
                />

                <Input
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  type="email"
                  error={errors.email}
                />

                <Input
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  type="password"
                  error={errors.password}
                />
              </>
            )}

          {/* --- Step 2: Confirmation --- */}
          {step === 2 && (
            <>
              <h2 className="text-xl mb-4">Confirm Your Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Company Name:</strong> {formData.companyName}</p>
                <p><strong>Company Email:</strong> {formData.companyEmail}</p>
                <p><strong>Company Contact:</strong> {formData.companyContact}</p>
                <p><strong>Province:</strong> {formData.province}</p>
                <p><strong>District:</strong> {formData.district}</p>
                <p><strong>Sector:</strong> {formData.sector}</p>
                <p><strong>Contact fullName:</strong> {formData.fullName}</p>
                <p><strong>phoneNumber:</strong> {formData.phoneNumber}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Files Uploaded:</strong> {uploadedFiles.length}</p>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Back
              </button>
            )}
            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-primaryColor-700 text-white rounded-lg hover:bg-primaryColor-800"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primaryColor-700 text-white rounded-lg hover:bg-primaryColor-800"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationFormRight;

