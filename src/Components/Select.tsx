import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  value: string;
  options: string[];
  placeholder?: string;
  error?: string; // ✅ add error prop
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  options,
  placeholder,
  error,
  className = "",
  ...rest
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block font-bold mb-2">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={(e) => rest.onChange && rest.onChange(e)}
      className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor-500 ${className} ${error ? "border-red-500" : ""}`}
      aria-label={label}
      {...rest}
    >
      <option value="" disabled>
        {placeholder || "-- Select --"}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Select;
