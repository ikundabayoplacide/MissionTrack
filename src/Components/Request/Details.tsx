import React, { useState } from "react";
import Input from "../Input";
import Header from "../HeaderDash";
import Sidebar from "../Dashboard/Sidebar";
import Stepper from "../Stepper";
import DragDrop from "../DragDrop";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
  FaFile,
} from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

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
    // if (currentStep === 1) {
    //   if (!formData.description) newErrors.description = "Please enter a description";
    //   if (uploadedFiles.length === 0) newErrors.files = "Please upload at least one file";
    // }
    // if (currentStep === 2) {
    //   if (uploadedFiles.length === 0) newErrors.files = "Please attach at least one file before submitting";
    // }
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

    uploadedFiles.forEach((file) => {
      form.append("documents", file);
    });

    const response = await fetch(
      "https://missiontrack-backend.onrender.com/api/missions",
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
};


  return (
    <>

      <div className="min-h-[650px] w-full bg-[#E6EAF5] max-w-5xl   flex flex-col">
        <div className="flex flex-col mt-5 mx-5 p-4">
          {/* Title */}
          <div className="w-full py-2  bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
            <h1 className="font-bold text-2xl text-center">Request a Work Mission</h1>
          </div>
          <p className="text-gray-700 text-center mt-2">
            Provide mission details, and supporting documents for approval.
          </p>

          {/* Stepper */}
          <Stepper steps={steps} currentStep={currentStep} />

          {/* Step content */}
          <div className="min-h-[450px] w-full bg-white rounded-md shadow mt-5">
            <div className="flex flex-col p-5">
              {/* Step 1 */}
              {currentStep === 0 && (
                <div className="flex flex-col w-full space-y-4">
                  <Input label="Mission Title" type="text" name="missionTitle" value={formData.missionTitle} onChange={handleChange} />
                  {errors.missionTitle && <span className="text-red-500 text-sm">{errors.missionTitle}</span>}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Input label="Names" type="text" name="names" value={formData.names} onChange={handleChange} />
                      {errors.names && <span className="text-red-500 text-sm">{errors.names}</span>}
                    </div>
                    <div>
                      <Input label="Title/Position" type="text" name="position" value={formData.position} onChange={handleChange} />
                      {errors.position && <span className="text-red-500 text-sm">{errors.position}</span>}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <Input label="Destination" type="text" name="destination" value={formData.destination} onChange={handleChange} />
                      {errors.destination && <span className="text-red-500 text-sm">{errors.destination}</span>}
                    </div>
                    <div>
                      <Input label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                      {errors.startDate && <span className="text-red-500 text-sm">{errors.startDate}</span>}
                    </div>
                    <div>
                      <Input label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                      {errors.endDate && <span className="text-red-500 text-sm">{errors.endDate}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 1 && (
                <div className="grid grid-cols-2 gap-6 text-gray-700">
                  <div className="flex flex-col mt-6 space-y-4">
                    <Input label="Document Description" type="text" name="description" value={formData.description} onChange={handleChange} />
                    {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                    <div className="resize-y overflow-auto min-h-[150px] max-h-[400px] border-2 border-dashed border-gray-400 rounded-md">
                      <DragDrop onFileSelect={(files) => setUploadedFiles([...uploadedFiles, ...files])} />
                    </div>
                    {errors.files && <span className="text-red-500 text-sm">{errors.files}</span>}
                  </div>
                  <div className="mt-4 border rounded-md border-gray-300 space-y-2 p-2 h-[250px] overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between underline p-2">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.name)}
                          <span>{file.name}</span>
                        </div>
                        <button onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))} className="text-red-500 hover:text-red-700 text-sm">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 2 && (
                <div className="text-center mt-40 text-gray-700">
                  <h2 className="text-lg font-semibold mb-4">
                    All Set? Click Submit Request to send it for approval.
                  </h2>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-6 justify-center">
                {currentStep > 0 && (
                  <button onClick={handleBack} className="px-4 py-2 rounded text-primaryColor-500 border-2 border-primaryColor-500 w-[200px]">
                    Back
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button onClick={handleNext} className="px-4 py-2 rounded text-accent-500 border-2 border-accent-500 w-[200px]">
                    Next
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="px-4 py-2 rounded text-accent-500 border-2 border-accent-500 w-[200px]">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ✅ Success Modal */}
          {isSubmitted && (
            <div className="fixed inset-0 flex items-center h- justify-center bg-black/60 bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg h-[600px]  p-8 max-w-md text-center relative">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
                <div className="flex flex-col justify-center mt-30 items-center">
                  <div className="bg-accent-600 p-3 flex  justify-center  rounded-full">
                    <FaCheck size={50} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-bold">Success</h1>
                  <p className="mt-4 text-gray-700">
                    Your mission request has been successfully submitted
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default Details;
