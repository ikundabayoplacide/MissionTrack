import React, { useState } from "react";
import Input from "../Input";
import { FiCalendar } from "react-icons/fi";
import Header from "../HeaderDash";
import Sidebar from "./Sidebar";
import DragDrop from "../DragDrop";
import {
    FaFilePdf,
    FaFileWord,
    FaFileExcel,
    FaFileImage,
    FaFileAlt,
    FaFile,
} from "react-icons/fa";

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

const Report: React.FC = () => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // ✅ Submit data
            console.log("Form submitted:", formData, uploadedFiles);

            // Reset if you want
            setFormData({ description: "", date: "", activities: "", notes: "" });
            setUploadedFiles([]);
            setErrors({});
        }
    };

    return (
        <>
            <Header />
            <div className="flex gap-70 h-full bg-[#E6EAF5] mt-20">
                <Sidebar />
                <div className="flex flex-col ">
                    <div className="w-[1000px]  py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
                        <h1 className="font-bold text-2xl text-center">
                            Notifications
                        </h1>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="w-[1000px] mt-10 flex bg-white rounded-xl shadow-lg"
                    >
                        <div className="flex flex-col w-full">
                            <div className="border-b rounded-md border-gray-600">
                                {/* Content header */}
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
                                            className="flex items-center justify-between p-2 "
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
                                    placeholder=""
                                    value={formData.notes}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-center gap-5 pb-6">
                                <button
                                    type="button"
                                    className="text-red-500 border-2 border-red-500 rounded-2xl px-12 max-sm:p-1 ml-2 py-2"
                                    onClick={() => {
                                        setFormData({
                                            description: "",
                                            date: "",
                                            activities: "",
                                            notes: "",
                                        });
                                        setUploadedFiles([]);
                                        setErrors({});
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-white bg-accent-500 border-2 rounded-2xl px-12 max-sm:p-1 ml-2 py-2"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Report;
