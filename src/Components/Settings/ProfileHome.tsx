import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import Input from "../Input";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { RootState,AppDispatch } from "../../redux/store";
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearActionState, updatedProfile } from "../../redux/profileSlice";
import { useAuth } from "../../context/AuthContext";

interface DecodedToken {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role?: string;
  profilePhoto?: string;
  exp: number;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
    const { user,setUser } = useAuth();
  const {loading,error,profilePhoto}=useSelector((state:RootState)=>state.profile);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
    profilePhoto: "",
    bankAccount: "",
  });

  const [originalData, setOriginalData] = useState(formData);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Load user info from token
useEffect(() => {
  // First, try to get user from AuthContext
  if (user && user.profilePhoto) {
    const userData = {
      fullName: user.fullName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      role: user.role || "",
      profilePhoto: user.profilePhoto || "",
      bankAccount: "",
    };
    setFormData(userData);
    setOriginalData(userData);
  } else {
    // Fallback to token if user context doesn't have the data
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const userData = {
          fullName: decoded.fullName || "",
          email: decoded.email || "",
          phoneNumber: decoded.phoneNumber || "",
          role: decoded.role || "",
          profilePhoto: decoded.profilePhoto || "",
          bankAccount: "",
        };
        setFormData(userData);
        setOriginalData(userData);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }
}, [user, profilePhoto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setSelectedFile(file);
    const photoUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, profilePhoto: photoUrl }));
  }
};

  const handleSave = async () => {
    try{
       const formDataToSend=new FormData();
      formDataToSend.append("fullName",formData.fullName);
      formDataToSend.append("email",formData.email);
      formDataToSend.append("phoneNumber",formData.phoneNumber);
      formDataToSend.append("bankAccount",formData.bankAccount);
      if(selectedFile){
        formDataToSend.append("profilePhoto",selectedFile);
      }
     const updatedUser= await dispatch(updatedProfile(formDataToSend)).unwrap();
      setOriginalData(formData);
      setIsEditing(false);
        setUser((prev) => ({ ...prev, ...updatedUser }));
      localStorage.setItem("user", JSON.stringify({ ...user, ...updatedUser }));
    }
    catch(err){
      console.error("Failed to update profile:", err);
    }
  };

  const handleCancel = async() => {
    try{
       setFormData(originalData); 
      setIsEditing(false);
      dispatch(clearActionState());
    }
    catch(err){
      console.error("Failed to clear action state:", err);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden ">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Personal Information</h1>
        {isEditing ? (
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center mt-[-40px]">
        <img
          src={formData.profilePhoto}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-2 text-sm"
          />
        )}
        <div className="text-center mt-2 font-medium">{formData.fullName || "Employee"}</div>
        <div className="text-center text-sm text-gray-500">{formData.role || "Role"}</div>
      </div>

      {/* Inputs */}
      <div className="p-5 grid grid-cols-2 gap-6">
        <Input
          label="Full Names"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your name"
          disabled={!isEditing||loading}
          icon={<FiUser />}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          disabled={!isEditing}
          icon={<FaEnvelope />}
        />
      </div>

      <div className="p-5 grid grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="0788888888"
          disabled={!isEditing}
          icon={<FaPhoneAlt />}
        />
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="p-3 flex flex-col items-center">
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleSave}
            className="px-4 py-2 w-48 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
