import React, { useState } from "react";
import Input from "../Input";
import { FiCalendar } from "react-icons/fi";
import DragDrop from "../DragDrop";
import { IoEyeOutline } from "react-icons/io5";
import { LuFileCheck } from "react-icons/lu";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
  FaFile,
  FaEdit,
} from "react-icons/fa";
import { FaCalendar } from "react-icons/fa6";

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

type ReportProps = {
  missionId: string; // ✅ receive missionId dynamically
};

const Report: React.FC<ReportProps> = ({ missionId }) => {
  const [formData, setFormData] = useState({
    description: "",
    date: "",
    activities: "",
    notes: "",
  });

  const [errors, setErrors] = useState<{
    description?: string;
    date?: string;
    activities?: string;
    files?: string;
  }>({});

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 validation logic
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.date) {
      newErrors.date = "Date is required.";
    }
    if (!formData.activities.trim()) {
      newErrors.activities = "Daily activities are required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Document description is required.";
    }
    if (uploadedFiles.length === 0) {
      newErrors.files = "At least one file must be uploaded.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Updated handleSubmit with dynamic missionId
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    console.log("Submitting report with:", {
  userId,
  missionId,
  date: formData.date,
  dailyActivity: formData.activities,
  description: formData.description,
  files: uploadedFiles.map(f => f.name)
});


    try {
      const form = new FormData();
      form.append("userId", userId || "");
      form.append("missionId", missionId); // ✅ comes from prop
      form.append("date", formData.date);
      form.append("dailyActivity", formData.activities);
      form.append("description", formData.description);

      uploadedFiles.forEach((file) => form.append("document", file));

      const res = await fetch(
        "https://missiontrack-backend.onrender.com/api/reports/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("✅ Report submitted:", data);

      // Reset after success
      setFormData({ description: "", date: "", activities: "", notes: "" });
      setUploadedFiles([]);
      setErrors({});
      setShowForm(false);
    } catch (err) {
      console.error("❌ Report submission failed:", err);
    }
  };

  // 🔹 reusable report card
  const ReportCard = () => (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-600 font-semibold">
          <FaCalendar />
          <span>2024 - 01 - 15</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-accent-700 rounded-full">
          <LuFileCheck className="text-white" />
          <span className="text-white text-xs font-medium">Submitted</span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-[#0C326E]">
          Completed Quarterly Budget analysis
        </h3>
        <p className="text-sm font-medium text-gray-700">Tasks:</p>
        <ul className="list-disc list-inside text-gray-500 text-sm pl-4">
          <li>Budget analysis</li>
          <li>Presentation Preparation</li>
        </ul>
        <p className="text-xs text-gray-400">+1 more tasks</p>
      </div>

      <div className="flex justify-between space-x-4 pt-4 border-gray-200">
        <button className="flex-1 flex items-center justify-center gap-2 px-12 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
          <IoEyeOutline size={20} />
          View
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
          <FaEdit />
          Edit
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-[900px] py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
        <h1 className="font-bold text-2xl text-center">Daily Mission Report</h1>
      </div>

      {!showForm && (
        <>
          <button
            className="bg-primaryColor-700 w-[250px] mt-5 text-white rounded-lg px-15 max-sm:p-1 ml-2 py-2"
            onClick={() => setShowForm(true)}
          >
            + New Report
          </button>

          {/* 🔹 cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <ReportCard />
            <ReportCard />
            <ReportCard />
          </div>
        </>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex bg-white rounded-xl shadow-lg"
        >
          <div className="flex flex-col w-full">
            {/* Form Content */}
            <div className="border-b rounded-md border-gray-600">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">
                  Today&apos;s Activities
                </h2>
              </div>

              {/* Date input */}
              <div className="p-5 w-1/2">
                <Input
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  icon={<FiCalendar />}
                />
                {errors.date && (
                  <span className="text-red-500 text-sm">{errors.date}</span>
                )}
              </div>

              {/* Daily activities */}
              <div className="px-5 pb-5">
                <Input
                  label="Daily Activities"
                  name="activities"
                  placeholder="Write your activities here..."
                  value={formData.activities}
                  onChange={handleChange}
                  className="h-20"
                />
                {errors.activities && (
                  <span className="text-red-500 text-sm">
                    {errors.activities}
                  </span>
                )}
              </div>
            </div>

            {/* Attachments */}
            <div className="p-4 flex justify-between items-start gap-6">
              <div className="flex flex-col mt-2 space-y-4 w-1/2">
                <h2 className="text-lg font-semibold text-gray-700">
                  Attachments
                </h2>

                <Input
                  label="Document Description"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="px-5"
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description}
                  </span>
                )}

                <div className="resize-y overflow-auto min-h-[150px] max-h-[400px] border-2 border-dashed border-gray-400 rounded-md">
                  <DragDrop
                    onFileSelect={(files) =>
                      setUploadedFiles([...uploadedFiles, ...files])
                    }
                  />
                </div>
                {errors.files && (
                  <span className="text-red-500 text-sm">{errors.files}</span>
                )}
              </div>

              {/* Uploaded files preview */}
              <div className="mt-20 border rounded-md border-gray-300 space-y-2 p-2 h-[210px] overflow-y-auto w-1/2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.name)}
                      <span>{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setUploadedFiles(
                          uploadedFiles.filter((_, i) => i !== index)
                        )
                      }
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="px-5 pb-5">
              <Input
                label="Notes/Description"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-5 pb-6">
              <button
                type="button"
                className="text-red-500 border-2 border-red-500 rounded-2xl px-12 ml-2 py-2"
                onClick={() => {
                  setFormData({
                    description: "",
                    date: "",
                    activities: "",
                    notes: "",
                  });
                  setUploadedFiles([]);
                  setErrors({});
                  setShowForm(false); // back to cards
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white bg-accent-500 border-2 rounded-2xl px-12 ml-2 py-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Report;
