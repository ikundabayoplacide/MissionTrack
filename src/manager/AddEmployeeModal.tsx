import React, { useState } from "react";
import Input from "../Components/Input";
import SuccessCard from "../Components/SuccessCard";
import { useAuth } from "../context/AuthContext"; // 👈 import auth
import Select from "../Components/Select";

interface AddEmployeeModalProps {
  onClose: () => void;
  onEmployeeAdded: (employee: any) => void; // 👈 callback to parent
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ onClose, onEmployeeAdded }) => {
  const { user } = useAuth(); // 👈 get logged-in admin
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    department: "",
    role: "",
    position: "",   // ✅ added position
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.position.trim()) newErrors.position = "Position is required"; // ✅ new validation
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  try {
     const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      department: formData.department,
      role: formData.role,
      password: formData.password,
    };

    const response = await fetch("https://missiontrack-backend.onrender.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Failed to create user");
    }

    const resData = await response.json();

    // ✅ map API data to your Employee object
    const emp = resData.data;
    const mappedEmployee = {
      id: emp.id,
      fullName: emp.fullName,
      role: emp.role,
      department: emp.department || "N/A",
      status: emp.is_active ? "Active" : "Inactive",
      initials: emp.fullName
        ? emp.fullName.split(" ").map((n: string) => n[0]).join("")
        : "NA",
    };

    onEmployeeAdded(mappedEmployee); // 👈 parent gets consistent shape
    setSuccess(true);
  } catch (error: any) {
    console.error(error);
    alert(error.message || "Something went wrong");
  }
};


  return (
    <div className="fixed inset-0 bg-gray-600/70 z-1000 w-full flex items-center justify-center">
      <div className="relative p-8 bg-white overflow-y-auto h-[500px] w-96 md:w-[600px] mx-auto rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-2xl font-semibold text-[#0C326E]">Add a new employee</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        {success ? (
          <SuccessCard
            title="Employee Added!"
            message="The new employee has been successfully registered."
            buttonText="Back"
            onClose={onClose}
          />
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input label="Full Name" type="text" name="fullName" value={formData.fullName} onChange={handleChange} error={errors.fullName} />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <Input label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} />
            
            <Select label="Role" name="role" value={formData.role} placeholder="Select role" options={["employee", "manager", "finance"]} onChange={handleChange}
              className="border text-gray-700 border-gray-300 " labelClassName="text-gray-700 font-semibold"
              error={errors.role}
            />
            
            <Input label="Department" type="text" name="department" value={formData.department} onChange={handleChange} error={errors.department} />
            <Input label="Position" type="text" name="position" value={formData.position} onChange={handleChange} error={errors.position} /> {/* ✅ validated */}

            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />

            <div className="pt-4 flex justify-center space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-2 border border-red-300 rounded-2xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2 rounded-2xl text-sm font-medium text-white bg-accent-600 hover:bg-accent-700"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddEmployeeModal;
