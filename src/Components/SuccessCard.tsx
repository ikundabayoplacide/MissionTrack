import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";

interface SuccessCardProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onClose: () => void;
  icon?: React.ReactNode; // Allow custom icon
  className?: string; // Optional custom styling
}

const SuccessCard: React.FC<SuccessCardProps> = ({
  title = "Success!",
  message = "Operation completed successfully.",
  buttonText = "Back to Home",
  onClose,
  icon = <BsCheckCircleFill className="h-20 w-20 text-green-500" />,
  className = "",
}) => {
  return (
    <div
      className={`flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-lg ${className}`}
    >
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>

      <div className="mt-6">{icon}</div>

      <p className="mt-6 text-sm text-gray-600">{message}</p>

      <button
        onClick={onClose}
        className="mt-8 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-600"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SuccessCard;
