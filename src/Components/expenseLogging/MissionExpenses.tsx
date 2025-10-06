import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearState, fetchExpenseLogs, fetchExpenseLogsByMissionId, uploadExpenseLog } from "../../redux/EmployeeRedux/ExpenseLogs";
import { AppDispatch, RootState } from "../../redux/store";
import { LucideIcon } from "lucide-react";

interface OverviewCardProps {
  title: string;
  value: number;
  color: string;
  icon: LucideIcon;
}
const MissionExpenses: React.FC<OverviewCardProps> = () => {

  const { expenseLogs, error, success, loading } = useSelector((state: RootState) => state.ExpenseLogs);
   const { missions } = useSelector((state: RootState) => state.EmployeeMissions as {
      missions: any[] | { missions: any[] };
      loading: boolean;
      error: string | null;
    });
  const [activeTab, setActiveTab] = useState<"daily" | "calendar" | "add">("daily");
  const [accommodationFile, setAccommodationFile] = useState<File | null>(null);
  const [mealFile, setMealFile] = useState<File | null>(null);
  const [transportFile, setTransportFile] = useState<File | null>(null);
  const [selectedMission, setSelectedMission] = useState<any | null>(null);



  const dispatch = useDispatch<AppDispatch>();
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

  const handleMissionClick = (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId);
    setSelectedMission(mission);
    dispatch(fetchExpenseLogsByMissionId(missionId)); // We'll create this thunk
    setActiveTab("daily"); // automatically switch to daily tab
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", (document.getElementById("date") as HTMLInputElement).value);
    formData.append("missionId", selectedMission?.id);
    if (accommodationFile) formData.append("accommodationFile", accommodationFile);
    if (mealFile) formData.append("mealsFile", mealFile);
    if (transportFile) formData.append("transportFile", transportFile);
    formData.append("description", (document.getElementById("description") as HTMLTextAreaElement).value);

    try {
      await dispatch(uploadExpenseLog(formData)).unwrap();
      alert("Expense uploaded!");
      setAccommodationFile(null);
      setMealFile(null);
      setTransportFile(null);
      dispatch(fetchExpenseLogs());
    } catch (err) {
      console.error(err);
      alert("Failed to upload expense");
    }
  };

  useEffect(() => {
    dispatch(fetchExpenseLogs())
  }, [dispatch])
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

      <div className="w-[1020px] rounded-lg bg-white p-1">
        {/* Header with gradient */}
        <div className="w- py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
          <h1 className="font-bold text-2xl text-center">Mission Expenses</h1>
        </div>

        <div className=" px-6  rounded-lg">
          <div className="grid grid-cols-3 gap-4 my-4">
            {approvedCompletedMissions.slice(0, 3).map((mission) => (
              <div
                key={mission.id}
                className="p-4 bg-white rounded-lg shadow cursor-pointer hover:shadow-lg"
                onClick={() => handleMissionClick(mission.id)}
              >
                <h3 className="font-bold text-lg">{mission.title}</h3>
                <p className="text-gray-600">{mission.location}</p>
                <p className="text-sm text-gray-500">{`From ${new Date(mission.date).toLocaleDateString()} To ${new Date(mission.endDate).toLocaleDateString()}`}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex border-b justify-between px-4">
            <button
              onClick={() => setActiveTab("daily")}
              className={`px-4 py-2 text-sm font-medium ${activeTab === "daily"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
                }`}
            >
              Daily
            </button>
            <button
              onClick={() => setActiveTab("calendar")}
              className={`px-4 py-2 text-sm font-medium ${activeTab === "calendar"
                ? "border-b-2 border-blue-500 text-black font-bold text-lg"
                : "text-gray-500 hover:text-blue-600"
                }`}
            >
              Calendar
            </button>
            <div className="p-4">
              <button
                onClick={() => setActiveTab("add")}
                className={`px-4 py-2 text-sm font-medium ${activeTab === "add"
                  ? "border-b-2 border-blue-500 text-black font-bold text-lg"
                  : "text-gray-500 hover:text-blue-600"
                  }`}>
                <FiPlus size={25} className=" bg-blue-500 text-white rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Daily Tab */}
        {activeTab === "daily" && (
          <div>
            {expenseLogs.map((exp) => (
              <div key={exp.id} className="border ml-5 mt-7 rounded-md p-3 bg-white">
                <div className="flex justify-between items-center border p-2 rounded-lg mb-3">
                  <span className="text-sm font-semibold text-gray-600">
                    {new Date(exp.date).toDateString()}
                  </span>
                  <span className="text-sm font-bold text-red-500">
                    {exp.accommodationAmount + exp.mealsAmount + exp.transportAmount} Rwf
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-2">
                      <span className="text-gray-700">Accommodation</span>
                      {exp.accommodationFile && (
                        <a
                          href={exp.accommodationFile}
                          target="_blank"
                          className="text-green-600 cursor-pointer underline"
                        >
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
                        <a
                          href={exp.mealsFile}
                          target="_blank"
                          className="text-green-600 cursor-pointer underline"
                        >
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
                        <a
                          href={exp.transportFile}
                          target="_blank"
                          className="text-green-600 cursor-pointer underline"
                        >
                          View
                        </a>
                      )}
                    </div>
                    <span className="text-red-500 font-medium">{exp.transportAmount} Rwf</span>
                  </div>

                  {exp.description && (
                    <div className="mt-2 text-sm text-gray-600">Notes: {exp.description}</div>
                  )}
                </div>
              </div>
            ))}
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
                  className={`border-[0.5px] border-black p-5 ${day === "24" ? "bg-blue-500 text-white font-bold" : ""
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
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <label className="block text-sm font-medium text-gray-700">
                Accomodation Receipt
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Meal Receipt
              </label>
              <div className="relative">
                <input
                  type="file"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  onChange={handleMealChange}
                />
                <div className="border p-2 rounded-md">
                  {mealFile ? mealFile.name : "Select file"}
                </div>
              </div>

              <label className="block text-sm font-medium text-gray-700">
                Transport Receipt
              </label>
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
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 w-1/2 flex items-center justify-center text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Submit receipts
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
