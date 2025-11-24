import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearState, deleteExpenseLog, fetchExpenseLogsByMissionId, uploadExpenseLog } from "../../redux/EmployeeRedux/ExpenseLogs";
import { fetchEmployeeMissions } from "../../redux/EmployeeRedux/EmpMissions"; // ← ADD THIS IMPORT
import { AppDispatch, RootState } from "../../redux/store";
import { MdDelete, MdEdit, MdLocationPin } from "react-icons/md";

const MissionExpenses: React.FC = () => {

  const { expenseLogs, success } = useSelector((state: RootState) => state.ExpenseLogs);
  const { missions, loading: missionsLoading } = useSelector((state: RootState) => state.EmployeeMissions as {
    missions: any[] | { missions: any[] };
    loading: boolean;
    error: string | null;
  });
  const [activeTab, setActiveTab] = useState<"daily" | "calendar" | "add">("daily");
  const [accommodationFile, setAccommodationFile] = useState<File | null>(null);
  const [mealFile, setMealFile] = useState<File | null>(null);
  const [transportFile, setTransportFile] = useState<File | null>(null);
  const [selectedMission, setSelectedMission] = useState<any | null>(null);
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  // ✅ FETCH MISSIONS ON COMPONENT MOUNT
  useEffect(() => {
    dispatch(fetchEmployeeMissions());
  }, [dispatch]);

  const missionArray = Array.isArray(missions) ? missions : missions?.missions || [];

  const approvedCompletedMissions = missionArray.filter(
    (mission) =>
      mission.status === "completed" || mission.status === "manager_approved"
  );

  const [formData, setFormData] = useState({
    date: "",
    missionId: "",
    accomodationAmount: "",
    mealsAmount: "",
    transportAmount: "",
    description: ""
  });

  const handleAccommodationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAccommodationFile(e.target.files[0]);
    }
  };

  const handleMealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMealFile(e.target.files[0]);
    }
  };

  const handleTransportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTransportFile(e.target.files[0]);
    }
  };

  const handleMissionClick = async (missionId: string) => {
    setLoadingExpenses(true);
    const mission = missionArray.find((m) => m.id === missionId);
    setSelectedMission(mission);
    await dispatch(fetchExpenseLogsByMissionId(missionId));
    setLoadingExpenses(false);
    setActiveTab("daily");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!selectedMission) {
      alert("Please select a mission first.");
      setIsSubmitting(false);
      return;
    }
    if (!accommodationFile && !mealFile && !transportFile) {
      alert("Please upload at least one receipt.");
      setIsSubmitting(false);
      return;
    }
    const formData = new FormData();
    formData.append("date", (document.getElementById("date") as HTMLInputElement).value);
    formData.append("missionId", selectedMission?.id);
    if (accommodationFile) formData.append("accommodationFile", accommodationFile);
    if (mealFile) formData.append("mealsFile", mealFile);
    if (transportFile) formData.append("transportFile", transportFile);
    formData.append("description", (document.getElementById("description") as HTMLTextAreaElement).value);

    try {
      await dispatch(uploadExpenseLog(formData)).unwrap();
      alert("Expense uploaded successfully!");
      setAccommodationFile(null);
      setMealFile(null);
      setTransportFile(null);
      dispatch(fetchExpenseLogsByMissionId(selectedMission?.id));
    } catch (err) {
      console.error(err);
      alert("Failed to upload expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this expense log?")) return;

    setDeletingId(id);
    try {
      await dispatch(deleteExpenseLog(id)).unwrap();
      alert("Expense log deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete expense log!");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (selectedMission) {
      dispatch(fetchExpenseLogsByMissionId(selectedMission?.id));
    }
  }, [dispatch, selectedMission]);

  useEffect(() => {
    if (success) {
      setFormData({
        date: "",
        missionId: "",
        accomodationAmount: "",
        mealsAmount: "",
        transportAmount: "",
        description: ""
      });
      setActiveTab("daily");
      dispatch(clearState());
    }
  }, [success, dispatch]);

  return (
    <>
      <div className="w-full rounded-lg bg-white p-1">
        {/* Header with gradient */}
        <div className="w-full py-2 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
          <h1 className="font-bold text-2xl text-center">Mission Expenses</h1>
        </div>

        <div className="px-6 rounded-lg">
          <div className="my-4">
            {missionsLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-2 text-gray-500">Loading missions...</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {approvedCompletedMissions.length > 0 ? (
                  approvedCompletedMissions.slice(0, 3).map((mission) => (
                    <div
                      key={mission.id}
                      className="p-4 bg-white rounded-lg border shadow hover:shadow-lg cursor-pointer"
                      onClick={() => handleMissionClick(mission.id)}
                    >
                      <h3 className="font-bold text-lg">{mission.missionTitle}</h3>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 flex gap-1 mt-1">
                          <MdLocationPin className="mt-1" />
                          {mission.location}
                        </p>
                        <p
                          className={`text-sm italic font-semibold ${
                            mission.status === "completed"
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
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No approved or completed missions found.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b justify-between px-4">
            <button
              onClick={() => setActiveTab("daily")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "daily"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setActiveTab("calendar")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "calendar"
                  ? "border-b-2 border-blue-500 text-black font-bold text-lg"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Calendar
            </button>
            <div className="p-4">
              <button
                onClick={() => setActiveTab("add")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "add"
                    ? "border-b-2 border-blue-500 text-black font-bold text-lg"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                <FiPlus size={25} className="bg-blue-500 text-white rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Daily Tab */}
        {activeTab === "daily" && (
          <div>
            {loadingExpenses ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-2 text-gray-500">Loading expenses...</p>
              </div>
            ) : expenseLogs.length > 0 ? (
              expenseLogs.map((exp) => (
                <div key={exp.id} className="border ml-5 mt-7 rounded-md p-3 bg-white">
                  <div className="flex justify-between items-center border p-2 rounded-lg mb-3">
                    <span className="text-sm font-semibold text-gray-600">
                      {new Date(exp.date).toDateString()}
                    </span>
                    <span className="text-sm font-semibold text-gray-600">{exp.status}</span>
                    <div className="flex gap-2">
                      <MdEdit />
                      {deletingId === String(exp.id) ? (
                        <div className="flex items-center text-red-500 text-sm">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-500 mr-1"></div>
                          Deleting...
                        </div>
                      ) : (
                        <MdDelete
                          onClick={() => handleDelete(String(exp.id))}
                          className="cursor-pointer text-red-500 hover:text-red-700"
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex gap-2">
                        <span className="text-gray-700">Accommodation</span>
                        {exp.accommodationFile && (
                          <a href={exp.accommodationFile} target="_blank" className="text-green-600 underline">
                            View
                          </a>
                        )}
                      </div>
                      <span className="text-red-500 font-medium">{exp.accommodationAmount} Rwf</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex gap-2">
                        <span className="text-gray-700">Meal</span>
                        {exp.mealsFile && (
                          <a href={exp.mealsFile} target="_blank" className="text-green-600 underline">
                            View
                          </a>
                        )}
                      </div>
                      <span className="text-red-500 font-medium">{exp.mealsAmount} Rwf</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex gap-2">
                        <span className="text-gray-700">Transport</span>
                        {exp.transportFile && (
                          <a href={exp.transportFile} target="_blank" className="text-green-600 underline">
                            View
                          </a>
                        )}
                      </div>
                      <span className="text-red-500 font-medium">{exp.transportAmount} Rwf</span>
                    </div>
                    <div className="flex justify-between items-center">
                      {exp.description && (
                        <div className="mt-2 text-sm text-gray-600">Notes: {exp.description}</div>
                      )}
                      <span className="text-sm font-bold text-red-500">
                        Total: {exp.accommodationAmount + exp.mealsAmount + exp.transportAmount} Rwf
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No expense logs for this mission yet.</p>
            )}
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === "calendar" && (
          <div className="p-4">
            {/* Days of the week */}
            <div className="grid grid-cols-7 text-center font-semibold">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>
            {/* Dates */}
            <div className="grid grid-cols-7 text-center mt-2 border">
              {[
                "1", "2", "3", "4", "5", "6", "7",
                "8", "9", "10", "11", "12", "13",
                "14", "15", "16", "17", "18", "19", "20",
                "21", "22", "23", "24", "25", "26", "27",
                "28", "29", "30", "31", "1", "2", "3", "4",
              ].map((day, index) => (
                <div
                  key={index}
                  className={`border-[0.5px] border-black p-5 ${
                    day === "24" ? "bg-blue-500 text-white font-bold" : ""
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Tab */}
        {activeTab === "add" && (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Add New Expense</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  id="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <label className="block text-sm font-medium text-gray-700">Accommodation Receipt</label>
              <div className="relative">
                <input
                  type="file"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  onChange={handleAccommodationChange}
                />
                <div className="border p-2 rounded-md">
                  {accommodationFile ? accommodationFile.name : "Select file"}
                </div>
              </div>
              <label className="block text-sm font-medium text-gray-700">Meal Receipt</label>
              <div className="relative">
                <input
                  type="file"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  onChange={handleMealChange}
                />
                <div className="border p-2 rounded-md">{mealFile ? mealFile.name : "Select file"}</div>
              </div>

              <label className="block text-sm font-medium text-gray-700">Transport Receipt</label>
              <div className="relative">
                <input
                  type="file"
                  className="opacity-0 absolute inset-0 w-full py-3 h-full cursor-pointer"
                  onChange={handleTransportChange}
                />
                <div className="border p-2 rounded-md">
                  {transportFile ? transportFile.name : "Select file"}
                </div>
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="description"
                  id="description"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-blue-600 w-1/2 flex items-center justify-center text-white px-4 py-2 rounded-md ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit receipts"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default MissionExpenses;