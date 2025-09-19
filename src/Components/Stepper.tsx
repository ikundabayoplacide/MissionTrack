import React from "react";
import { FaCheck } from "react-icons/fa";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-4"> 
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="flex flex-col items-center gap-1">
            {/* Circle */}
            <div
              className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border transition-all duration-300
                ${isCompleted ? "bg-accent-500 text-white border-accent-500" : ""}
                ${isActive ? "border-accent-500 text-accent-600" : "border-gray-300 text-gray-400"}
              `}
            >
              {isCompleted ? <FaCheck size={12} /> : index + 1}
            </div>

            {/* Label */}
            <span
              className={`text-[10px] sm:text-xs ${isActive ? "text-accent-600 font-semibold" : "text-gray-500"}`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
