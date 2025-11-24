import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import Stepper from "../Stepper";
import DragDrop from "../DragDrop";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
  FaFile,
  FaCheck,
  FaArrowLeft,
  FaPaperPlane
} from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";

// 🔹 file type icon helper
const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <FaFilePdf className="text-red-500 text-xl" />;
    case "doc":
    case "docx":
      return <FaFileWord className="text-blue-500 text-xl" />;
    case "xls":
    case "xlsx":
      return <FaFileExcel className="text-green-600 text-xl" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      return <FaFileImage className="text-yellow-500 text-xl" />;
    case "txt":
      return <FaFileAlt className="text-gray-600 text-xl" />;
    default:
      return <FaFile className="text-gray-500 text-xl" />;
  }
};

const Details: React.FC = () => {
  const navigate = useNavigate();
  // ✅ Form stat
  const [formData, setFormData] = useState({
    missionTitle: "",
    names: "",
    position: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = ["Mission Details", "Attachments", "Submission"];
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Validation logic per step
  const validateStep = () => {
    let newErrors: { [key: string]: string } = {};
    if (currentStep === 0) {
      if (!formData.missionTitle) newErrors.missionTitle = "Mission title is required";
      if (!formData.names) newErrors.names = "Names are required";
      if (!formData.position) newErrors.position = "Position is required";
      if (!formData.destination) newErrors.destination = "Destination is required";
      if (!formData.startDate) newErrors.startDate = "Start date is required";
      if (!formData.endDate) newErrors.endDate = "End date is required";
      if (formData.startDate && formData.endDate) {
        if (new Date(formData.endDate) < new Date(formData.startDate)) {
          newErrors.endDate = "End date cannot be earlier than start date";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please log in.");
        return;
      }

      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("No userId found. Please log in.");
        return;
      }

      const form = new FormData();
      form.append("userId", userId);
      form.append("missionTitle", formData.missionTitle);
      form.append("fullName", formData.names);
      form.append("jobPosition", formData.position);
      form.append("location", formData.destination);
      form.append("startDate", formData.startDate);
      form.append("endDate", formData.endDate);
      form.append("missionDescription", formData.description);
      form.append("missionDocument", "Primary mission");
      form.append("mission", "Primary mission");

      uploadedFiles.forEach((file) => {
        form.append("documents", file);
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/missions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit mission");
      }

      console.log("✅ Backend response:", data);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("❌ Submission error:", error.message);
      alert(error.message);
    }
    finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full bg-[#E6EAF5] flex justify-center items-start pt-10 pb-20 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/pattern.png')]"></div>
          <h1 className="text-3xl font-bold relative z-10">Request a Work Mission</h1>
          <p className="text-blue-100 mt-2 relative z-10">Submit your mission details for approval</p>
        </div>

        {/* Stepper Container */}
        <div className="bg-gray-50 border-b border-gray-200 py-6 px-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Form Content */}
        <div className="p-8 min-h-[400px]">
          {/* Step 1: Mission Details */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 gap-6">
                <Input
                  label="Mission Title"
                  type="text"
                  name="missionTitle"
                  value={formData.missionTitle}
                  onChange={handleChange}
                  placeholder="e.g., Annual Strategy Meeting"
                  error={errors.missionTitle}
                  className="bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  type="text"
                  name="names"
                  value={formData.names}
                  onChange={handleChange}
                  error={errors.names}
                  className="bg-white"
                />
                <Input
                  label="Position / Role"
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  error={errors.position}
                  className="bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="Destination"
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  error={errors.destination}
                  className="bg-white"
                />
                <Input
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  error={errors.startDate}
                  className="bg-white"
                />
                <Input
                  label="End Date"
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  error={errors.endDate}
                  className="bg-white"
                />
              </div>
            </div>
          )}

          {/* Step 2: Attachments */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-800 text-sm mb-4">
                Please upload any supporting documents for your mission (e.g., invitation letters, agenda, budget plan).
              </div>

              <Input
                label="Document Description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the documents..."
                error={errors.description}
                className="bg-white"
              />

              <div className="mt-4">
                <label className="block font-medium text-gray-700 mb-2">Upload Files</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors bg-gray-50">
                  <DragDrop onFileSelect={(files) => setUploadedFiles([...uploadedFiles, ...files])} />
                </div>
                {errors.files && <span className="text-red-500 text-sm mt-1 block">{errors.files}</span>}
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Attached Files ({uploadedFiles.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 overflow-hidden">
                          {getFileIcon(file.name)}
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        </div>
                        <button
                          onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700 text-xs font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Submission */}
          {currentStep === 2 && (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-fadeIn">
              <div className="bg-blue-100 p-6 rounded-full mb-6">
                <FaPaperPlane className="text-blue-600 text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Submit?</h2>
              <p className="text-gray-600 max-w-md">
                Please review your details before submitting. Once submitted, your request will be sent to your manager for approval.
              </p>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg w-full max-w-lg text-left border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 border-b pb-2">Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 block">Title</span>
                    <span className="font-medium">{formData.missionTitle}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Destination</span>
                    <span className="font-medium">{formData.destination}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Dates</span>
                    <span className="font-medium">{formData.startDate} to {formData.endDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Files</span>
                    <span className="font-medium">{uploadedFiles.length} attached</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Navigation */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-between items-center">
          {currentStep > 0 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            >
              <FaArrowLeft size={14} /> Back
            </button>
          ) : (
            <div></div> /* Spacer */
          )}

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
            >
              Next <GrFormNextLink size={20} className="text-white" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-lg font-medium shadow-md transition-all ${isLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg"
                }`}
            >
              {isLoading ? "Submitting..." : "Submit Request"}
            </button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md text-center relative overflow-hidden animate-scaleIn">
            <div className="bg-green-600 h-2 w-full"></div>
            <div className="p-8">
              <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaCheck size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted!</h2>
              <p className="text-gray-600 mb-8">
                Your mission request has been successfully submitted and is pending approval.
              </p>
              <button
                onClick={() => navigate("/employee/requestList")}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Go to Request List
              </button>
            </div>
            <button
              onClick={() => navigate("/employee/requestList")}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
