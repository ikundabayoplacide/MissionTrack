import React, { useEffect, useState } from "react";
import Input from "../Input";
import { FiCalendar } from "react-icons/fi";
import DragDrop from "../DragDrop";
import { IoEyeOutline } from "react-icons/io5";
import { LuFileCheck } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { MdLocationPin } from "react-icons/md";
import { AllReports, clearReports, fetchReportsByMissionId, createDailyReport } from "../../redux/EmployeeRedux/DailyReport";
import { BiPlus } from "react-icons/bi";
import { Modal, message } from "antd";

const Report: React.FC = () => {
  const { missions } = useSelector((state: RootState) => state.EmployeeMissions as {
    missions: any[] | { missions: any[] };
    loading: boolean;
    error: string | null;
  });
  const { reports, loading, error } = useSelector((state: RootState) => state.DailyReports);
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
  const [selectedMission, setSelectedMission] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  // to get All reports
  useEffect(() => {
    dispatch(AllReports())
  }, [dispatch]);

  const approvedCompletedMissions = Array.isArray(missions)
    ? missions.filter((m) =>
      ["financial_approved", "completed"].includes(
        m.status
      )
    )
    : [];



  useEffect(() => {
    if (selectedMission) {
      dispatch(fetchReportsByMissionId(selectedMission.id));
    }
  }, [dispatch, selectedMission]);


  const handleMissionClick = async (missionId: string) => {
    dispatch(clearReports());
    setShowForm(false);
    setSelectedMission(null);
    try {
      const missionArray = Array.isArray(missions) ? missions : missions.missions;
      const found = missionArray.find((m: any) => m.id === missionId) ?? null;
      setSelectedMission(found);
      await dispatch(fetchReportsByMissionId(missionId)).unwrap();
    } catch (error) {
      console.error("Error fetching reports:", error);
      message.error("Failed to fetch reports for this mission");
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      message.warning("Please fill in all required fields");
      return;
    }
    if (!selectedMission) {
      message.error("No mission selected");
      return;
    }
    setSubmitting(true);
    const reportData = new FormData();
    reportData.append("description", formData.description);
    reportData.append("date", formData.date);
    reportData.append("dailyActivity", formData.activities);
    reportData.append("missionId", selectedMission.id);
    if (uploadedFiles.length > 0) {
      reportData.append("document", uploadedFiles[0]);
    }
    try {
      await dispatch(createDailyReport(reportData)).unwrap();
      message.success("Report created successfully!");
      setOpen(false);
      setFormData({
        description: "",
        date: "",
        activities: "",
        notes: "",
      });
      setUploadedFiles([]);
      setErrors({});
      setShowForm(false);

      if (selectedMission) {
        dispatch(fetchReportsByMissionId(selectedMission.id));
      }
    } catch (error) {
      console.error("Error creating report:", error);
      message.error(
        (error && typeof error === "object" && "message" in error ? (error as any).message : undefined) ||
        "Failed to create report. Please try again."
      );
    }
  };
  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const ReportCard = ({ report }: { report: any }) => (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-xl border border-gray-400 shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-600 font-semibold gap-2">
          <FiCalendar />
          <span>{new Date(report.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-accent-700 rounded-full">
          <LuFileCheck className="text-white" />
          <span className="text-white text-xs font-medium">Submitted</span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-[#0C326E]">{report.description}</h3>
        <p className="text-sm text-gray-600">{report.dailyActivity}</p>
      </div>

      <div className="flex justify-between space-x-4 pt-4 border-t border-gray-200">
        {report.documents || report.filePath ? (
          <a
            href={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/${report.filePath || report.documents}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <IoEyeOutline size={20} />
            View_Doc
          </a>
        ) : (
          <button
            disabled
            className="flex-1 flex items-center justify-center gap-2 px-8 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 cursor-not-allowed"
          >
            <IoEyeOutline size={20} />
            No Doc
          </button>
        )}
        <button className="flex-1 flex items-center justify-center gap-2 px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
          <FaEdit />
          Edit
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 rounded-lg">
      <div className="w-full py-2  bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
        <h1 className="font-bold text-2xl text-center ">Daily Mission Report</h1>
      </div>

      {/* Missions list */}
      <div className="my-4">
        {(Array.isArray(missions) ? missions : missions.missions).length === 0 ? (
          <p className="text-center text-gray-500 py-4">No missions found.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {approvedCompletedMissions.map((mission) => (
              <div
                key={mission.id}
                className={`p-4 bg-white rounded-lg border shadow hover:shadow-lg cursor-pointer ${selectedMission?.id === mission.id ? "ring-2 ring-blue-300" : ""
                  }`}
                onClick={() => handleMissionClick(mission.id)}
              >
                <h3 className="font-bold text-lg">{mission.missionTitle}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 flex gap-1 mt-1">
                    <MdLocationPin className="mt-1" />
                    {mission.location}
                  </p>
                  <p
                    className={`text-sm italic font-semibold ${mission.status === "completed"
                      ? "text-purple-600"
                      : mission.status === "financial_approved"
                        ? "text-blue-500"
                        : mission.status === "pending"
                          ? "text-orange-400"
                          : "text-green-500"
                      }`}
                  >
                    {mission.status === "financial_approved" ? "Ongoing" : mission.status}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  From {new Date(mission.startDate).toLocaleDateString()} to{" "}
                  {new Date(mission.endDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedMission && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => { setShowForm(true); setOpen(true); }}
            className="bg-blue-600 hover:bg-blue-800 cursor-pointer text-white px-4 py-2 gap-1 flex rounded-md"
          >
            <BiPlus size={23} /> Report From {selectedMission.location}
          </button>
        </div>
      )}

      {/* Reports area */}
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
          <p className="ml-2 text-gray-500">Loading reports...</p>
        </div>
      ) : reports && reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {reports.map((report: any) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">
          {selectedMission ? "No reports for this mission yet." : "No reports found."}
        </p>
      )}


      <Modal
        title={`Add New Report for ${selectedMission?.missionTitle}`}
        open={showForm}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            icon={<FiCalendar />}
          />
          {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}

          <Input
            label="Daily Activities"
            name="dailyActivity"
            placeholder="Write your activities here..."
            value={formData.activities}
            onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
          />
          {errors.activities && <span className="text-red-500 text-sm">{errors.activities}</span>}

          <Input
            label="Document Description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}

          <div className="border-2 border-dashed border-gray-400 rounded-md p-3">
            <DragDrop onFileSelect={(files: File[]) => setUploadedFiles((prev) => [...prev, ...files])} />
            {uploadedFiles.length > 0 && (
              <ul className="mt-2">
                {uploadedFiles.map((f, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <span>{f.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.files && <span className="text-red-500 text-sm">{errors.files}</span>}

          <div className="flex justify-center gap-5 pt-4">
            <button
              type="button"
              className="bg-transparent text-red-500 border border-red-500 rounded px-4 py-2 mt-3"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white rounded px-4 py-2 mt-3"
            >
              {submitting ? "Saving..." : "Save Report"}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default Report;
