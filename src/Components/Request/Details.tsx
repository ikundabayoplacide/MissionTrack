import React, { useState } from "react";
import Input from "../Input";
import Header from "../HeaderDash";
import Sidebar from "../Sidebar";
import Stepper from "../Stepper";
import DragDrop from "../DragDrop";

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

  const steps = ["Mission Details", "Budget Estimate", "Attachments"];
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    console.log("Uploaded Files:", uploadedFiles);
  };

  return (
    <>
      <Header />
      <div className="flex gap-6">
        <Sidebar />
        <div className="h-[650px] w-[800px] mt-25 ml-65 flex flex-col bg-gradient-to-r to-accent-10/50 rounded-md shadow">
          <div className="flex flex-col mt-5 mx-5 p-4 border border-gray-400 rounded-md">
            
            {/* Stepper */}
            <Stepper steps={steps} currentStep={currentStep} />

            {/* Step 1 - Mission Details */}
            {currentStep === 0 && (
              <div className="flex flex-col w-full space-y-4">
                <div className="grid grid-cols-2">
                  <Input
                    label="Mission Title"
                    type="text"
                    name="missionTitle"
                    value={formData.missionTitle}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Input
                    label="Names"
                    type="text"
                    name="names"
                    value={formData.names}
                    onChange={handleChange}
                  />
                  <Input
                    label="Title/Position"
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <Input
                    label="Destination"
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                  <Input
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                  <Input
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>

                <Input
                  label="Description"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="h-30 px-5"
                />
              </div>
            )}

            {/* Step 2 - Budget Estimation */}
            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-6 text-gray-700">
                <div className="flex flex-col mt-6 space-y-4">
                  <Input
                    label="What the document is this?"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="px-5"
                  />

                  {/* Resizable drag & drop */}
                  <div className="resize-y overflow-auto min-h-[150px] max-h-[400px] border-2 border-dashed border-gray-400 rounded-md">
                    <DragDrop
                      onFileSelect={(files) =>
                        setUploadedFiles([...uploadedFiles, ...files])
                      }
                    />
                  </div>
                </div>

                {/* Uploaded files preview */}
                <div className="mt-4 border rounded-md border-gray-300 space-y-2 p-2 h-[300px] overflow-y-auto">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between underline p-2"
                    >
                      <span>{file.name}</span>
                      <button
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
            )}

            {/* Step 3 - Attachments */}
            {currentStep === 2 && (
              <div className="text-center text-gray-700">
                <h2 className="text-lg font-semibold mb-4">Attachments</h2>
                <input type="file" multiple className="border p-2 rounded" />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-6 justify-center  mt-6">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 rounded bg-gray-300 text-gray-700 w-[100px]"
                >
                  Back
                </button>
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded bg-accent-500 w-[200px] text-white"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded bg-accent-600 text-white"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
