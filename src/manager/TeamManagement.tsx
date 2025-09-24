import React, { useState, useEffect } from "react";
import { VscEye } from "react-icons/vsc";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal"; // new modal

interface Employee {
  id: string;
  fullName: string;
  role: string;
  department: string | null;
  status: string;
  initials?: string;
}

const TeamManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState<null | Employee>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // adjust number of cards per page

  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).token
    : "";

  // Fetch users (employees) from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(
          "https://missiontrack-backend.onrender.com/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          const mappedEmployees = data.data.map((emp: any) => ({
            id: emp.id,
            fullName: emp.fullName,
            role: emp.role,
            department: emp.department || "N/A",
            status: emp.is_active ? "Active" : "Inactive",
            initials: emp.fullName
              ? emp.fullName
                .split(" ")
                .map((n: string) => n[0])
                .join("")
              : "NA",
          }));
          setEmployees(mappedEmployees);
        } else {
          console.error(data.message || "Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Delete employee
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const res = await fetch(
        `https://missiontrack-backend.onrender.com/api/users/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      } else {
        console.error("Failed to delete employee");
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  // Update employee in list after edit
  const handleUpdate = (updated: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updated.id ? updated : emp))
    );
  };

  // Filter employees
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      (emp.department && emp.department.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen">
      <div className=" mx-auto py-2 mt-5 px-6 bg-gradient-to-l from-accent-10 to-primaryColor-50 rounded-md shadow-sm">
        <h1 className="font-bold text-2xl">
        Employee Management
        </h1>
      </div>

      <main className="p-6  ">


        <div className="flex gap-20 ">
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to page 1 when searching
            }}
            className="border border-gray-300 rounded-xl px-4 py-2 w-180 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span>
            <span className="text-green-600 font-black">All Members:</span>{" "}
            {employees.length}
          </span>
        </div>

        <div className="flex justify-between mt-5 items-center ">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-700  text-lg text-center rounded-2xl text-white py-2"
          >
            <div className="flex justify-center px-8 items-center">
              <span className="text-xl ">+</span>
              <span>Add Employee</span>
            </div>
          </button>
        </div>

        {/* employee cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white shadow rounded-xl p-5 flex flex-col items-center"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold mb-3">
                {emp.initials}
              </div>
              <h2 className="text-lg mb-5 font-medium text-gray-800">
                {emp.fullName}
              </h2>
              <p className="text-sm text-gray-500 text-center">
                {emp.role} <br />
                <span>{emp.department}</span>
              </p>
              <span
                className={`mt-8 px-3 py-1 rounded-sm text-xs font-medium ${emp.status === "Active"
                    ? "bg-green-700 text-white"
                    : "bg-gray-500 text-white"
                  }`}
              >
                {emp.status}
              </span>
              <div className="flex justify-between items-center w-full mt-4">
                <button className="flex items-center justify-center gap-2 border border-gray-300 w-90 h-10 rounded-md text-sm">
                  <VscEye className="text-lg" />
                  View
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditModal(emp)}
                    className="px-3 py-1 rounded-md border border-gray-300 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="px-3 py-1 rounded-md border border-red-500 text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onEmployeeAdded={(emp) =>
            setEmployees((prev) => [
              ...prev,
              {
                ...emp,
                initials: emp.fullName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join(""),
              },
            ])
          }
        />
      )}

      {editModal && (
        <EditEmployeeModal
          employee={editModal}
          onClose={() => setEditModal(null)}
          onEmployeeUpdated={handleUpdate}
        />
      )}
    </div>
  );
};

export default TeamManagement;
