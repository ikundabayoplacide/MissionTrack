import React, { useEffect, useState } from "react";
import Stepper from "./Stepper";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { AppDispatch, RootState } from "../redux/store";
import { registerCompany, resetCompanyState } from "../redux/companyRedux/companySlice";
import Input from "./Input";
import Select from "./Select";
import DragDrop from "./DragDrop";
import Checkbox from "./Checkbox";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Modal } from "antd";


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
const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { user } = useAuth();
  const [successMessage, setSuccessMessage] = useState(false);

  // ✅ log entire Redux state for debugging
  const companyState = useSelector((state: RootState) => state);
  console.log("Redux Root State:", companyState);

  // ✅ use only company slice instead of full root
  const { loading, success, error, message } = useSelector(
    (state: RootState) => state.company
  );

  // ✅ Redirect when success
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccessMessage(true);
      }, 1000); // 1.5s delay so user sees "success" message
    }
  }, [success, navigate]);

  // ✅ Get previousData from navigation state (if any)
  const previousData = location.state?.formData || {};

  const [formData, setFormData] = useState<any>({
    organizationName: previousData.organizationName || "",
    companyName: previousData.companyName || "",
    companyEmail: previousData.companyEmail || "",
    companyPhoneNumber: previousData.companyPhoneNumber || "",
    companyContact: previousData.companyContact || "",
    province: previousData.province || "",
    district: previousData.district || "",
    sector: previousData.sector || "",
    person: previousData.fullName || "",
    fullName: previousData.fullName || "",
    phone: previousData.phoneNumber || "",
    email: previousData.email || "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [step, setStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<any[] | string[]>([]);

  useEffect(() => {
    if (user?.companyId && user?.token) {
      fetch(
        `https://missiontrack-backend.onrender.com/api/companies/${user.companyId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            organizationName: data.companyName || "",
            province: data.province || "",
            district: data.district || "",
            sector: data.sector || "",
            companyEmail: data.companyEmail || user?.email || "",
            companyPhoneNumber: data.companyContact || "",
            person: data.manager?.fullName || "",
            phone: data.manager?.phoneNumber || data.manager?.phone || "",
            email: data.manager?.email || "",
            password: "",
            agree: false,
          });
        });
    }
  }, [user]);

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
      if (!formData.organizationName)
        newErrors.organizationName = "Organization name is required";
      if (!formData.province) newErrors.province = "Province is required";
      if (!formData.district) newErrors.district = "District is required";
      if (!formData.sector) newErrors.sector = "Sector is required";
      if (!formData.companyEmail)
        newErrors.companyEmail = "Company email is required";
      if (!formData.companyPhoneNumber) {
        newErrors.companyPhoneNumber = "Company phone number is required";
      } else if (formData.companyPhoneNumber.length < 10) {
        newErrors.companyPhoneNumber =
          "Company phone number must be at least 10 digits long";
      }
    }

    if (step === 1) {
      if (!formData.person) newErrors.person = "Contact Person is required";
      if (!formData.phone) {
        newErrors.phone = "Phone is required";
      } else if (formData.phone.length < 10) {
        newErrors.phone = "Phone number must be at least 10 digits long";
      }
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (uploadedFiles.length === 0)
        newErrors.files = "Please upload at least one file";
      if (!formData.agree) newErrors.agree = "You must agree to continue";
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

    // Use FormData instead of plain object
    const data = new FormData();
    data.append("companyName", formData.organizationName);
    data.append("companyEmail", formData.companyEmail);
    data.append("companyContact", formData.companyPhoneNumber);
    data.append("district", formData.district);
    data.append("province", formData.province);
    data.append("sector", formData.sector);
    data.append("fullName", formData.person);
    data.append("phoneNumber", formData.phone);
    data.append("email", formData.email);
    data.append("password", formData.password);

    // Append file(s)
    uploadedFiles.forEach((file: any) => {
      if (!file.fromServer) {
        data.append("proofDocument", file);
      }
    });

    dispatch(registerCompany(data));
  };

  // ------------------- Render -------------------
  return (
    <div className="min-h-screen bg-gradient-to-r from-primaryColor-10 via-primaryColor-10 to-accent-10 flex justify-center gap-20 w-full">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center px-10 mb-50">
        {/* Logo */}
        <div className="flex items-center gap-2  ">
          <img src="logo.svg" alt="logo" className="h-12 w-12" />
          <h1 className="font-bold text-xl">
            <span className="text-primaryColor-700">Mission</span>
            <span className="text-accent-700">Track.</span>
          </h1>
        </div>
        <h1 className="text-accent-800 text-3xl text-center font-bold ">
          Enter Your Contacts and <br /> Organization Info for Registration
        </h1>
        <img
          src="bro.png"
          alt="illustration"
          className="w-60 sm:w-80 md:w-96 mt-10"
        />
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center justify-start pt-5">
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
          <div className="mb-4 text-xl text-center text-accent-700 font-bold">
            <h2>New Organization Application Form</h2>
          </div>

          {/* Stepper */}
          <div className="max-w-md mx-auto mb-4">
            <Stepper
              steps={["Company Info", "Representative", "Confirmation"]}
              currentStep={step}
            />
          </div>

          {/* Multi-Step Form */}
          <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
            {/* Step 0 */}
            {step === 0 && (
              <div>
                <div className="mb-4 text-xl">
                  <h1>Company/Organization’s Information</h1>
                </div>
                <div className="rounded-2xl border p-6 space-y-4">
                  <Input
                    label="Organization Name"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Enter organization name"
                    error={errors.organizationName}
                    className="bg-gray-100"
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
                      className="bg-gray-100"
                    />
                    <Select
                      label="District"
                      name="district"
                      value={formData.district}
                      placeholder="District"
                      options={formData.province ? districts[formData.province] : []}
                      onChange={handleChange}
                      error={errors.district}
                      className="bg-gray-100"
                    />
                    <Select
                      label="Sector"
                      name="sector"
                      className="bg-gray-100"
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
                      className="bg-gray-100"
                      type="email"
                      value={formData.companyEmail}
                      onChange={handleChange}
                      placeholder="Enter company email"
                      error={errors.companyEmail}
                    />
                    <Input
                      label="Phone Number"
                      name="companyPhoneNumber"
                      className="bg-gray-100"
                      value={formData.companyPhoneNumber}
                      onChange={handleChange}
                      placeholder="+250788888888"
                      error={errors.companyPhoneNumber}
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
                    <div className="mt-3 space-y-2 bg-gray-100">
                      <ul className="space-y-1 text-sm text-gray-600">
                        {uploadedFiles.map((file: any, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-between bg-gray-200 p-2 rounded-lg"
                          >
                            {file.fromServer ? (
                              <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                {file.name}
                              </a>
                            ) : (
                              <span>{file.name}</span>
                            )}

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

            {/* Step 1 */}
            {step === 1 && (
              <>
                <Input
                  label="Contact Person"
                  name="person"
                  value={formData.person}
                  onChange={handleChange}
                  placeholder="Enter contact person name"
                  error={errors.person}
                  className="bg-gray-100"
                />

                <Input
                  label="Phone"
                  name="phone"
                  className="bg-gray-100"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  type="tel"
                  error={errors.phone}
                />

                <Input
                  label="Email"
                  name="email"
                  className="bg-gray-100"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  type="email"
                  error={errors.email}
                />

                <Input
                  label="Password"
                  name="password"
                  className="bg-gray-100"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  type="password"
                  error={errors.password}
                />

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <Checkbox
                      label="I agree to the Terms & Conditions"
                      checked={formData.agree}
                      onChange={(e) =>
                        setFormData({ ...formData, agree: e.target.checked })
                      }
                    />
                    {errors.agree && (
                      <p className="text-red-500 text-sm ml-2">{errors.agree}</p>
                    )}
                  </div>
                </div>

              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="bg-gray-100 rounded-2xl shadow-md p-6 border border-gray-200 max-h-[600px] overflow-y-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  Review Your Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-700 mb-1">Organization</p>
                    <p className="text-gray-600">{formData.organizationName || "-"}</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-700 mb-1">Location</p>
                    <p className="text-gray-600">
                      {formData.province}, {formData.district}, {formData.sector}
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-700 mb-1">Representative</p>
                    <p className="text-gray-600">{formData.person || "-"}</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-700 mb-1">Phone</p>
                    <p className="text-gray-600">{formData.phone || "-"}</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-700 mb-1">Email</p>
                    <p className="text-gray-600">{formData.email || "-"}</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg shadow-sm col-span-1 sm:col-span-2">
                    <p className="font-medium text-gray-700 mb-1">Uploaded Files</p>
                    {uploadedFiles && uploadedFiles.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-600">
                        {uploadedFiles.map((file, idx) => (
                          <li key={idx}>{file.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 italic">No files uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            )}

              <div className="text-sm mt-2 text-end">
                    <p>
                      Already have an account?{" "}
                      <Link to="/login" className="text-blue-600 hover:underline">
                        Log in
                      </Link>
                    </p>
                  </div>
            <div className="flex justify-center gap-4 mt-4 w-full">
              {step > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-2 py-1 flex items-center gap-2 justify-center w-full bg-gray-100 border border-gray-300 rounded-lg hover:border-blue-400 hover:border"
                >
                  <GrLinkPrevious className="inline-block" size={20} />Back
                </button>
              )}

              {step < 2 ? (
                <>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-2 w-full flex items-center justify-center gap-2 p-1 font-bold bg-accent-700 text-white rounded-lg hover:bg-accent-900 hover:shadow-lg"
                  >
                    Next  <GrLinkNext className="inline-block" size={20} />
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primaryColor-700 w-full text-white rounded-lg hover:bg-primaryColor-800 hover:shadow-lg font-semibold"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        </div>
        <Modal
          open={successMessage} footer={null}
          onCancel={() => {setSuccessMessage(false);
            dispatch(resetCompanyState());
          }
          }
          title="Registration Successful"
          centered
        >
          <p className="text-green-700">Your organization has been registered successfully!</p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                setSuccessMessage(false);
                navigate("/login");
              }}
              className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
            >
             Go to Login
            </button>
          </div>
        </Modal>
      </div>
    </div>

  );
};

export default ApplicationForm;


