import React from "react";
import { FaBuilding, FaFilePdf, FaRegEnvelope } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";

// Type definition for reusable InfoField
type InfoFieldProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  isLink?: boolean;
  link?: string;
};

// Reusable component for each information field
const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  icon,
  isLink = false,
  link,
}) => {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <div className="flex items-center">
        {icon && <span className="mr-2 text-gray-600">{icon}</span>}
        {isLink && link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-sm font-semibold text-gray-800 hover:underline"
          >
            {value}
          </a>
        ) : (
          <span className="flex-1 text-sm font-semibold text-gray-800">
            {value}
          </span>
        )}
      </div>
    </div>
  );
};

// Main component for the Company Information card
const CompanyInformationCard: React.FC = () => {
  // SVG icons
  const documentIcon = <FaBuilding className="text-primaryColor-500" />

  const emailIcon = <FaRegEnvelope/>
    

  const phoneIcon = <FiPhone/>

  const licenseIcon = <FaFilePdf className="text-red-500"/>

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        {documentIcon}
        <h2 className="text-lg font-semibold text-gray-800">
          Company Information
        </h2>
      </div>

      {/* Info fields */}
      <InfoField label="Company Name" value="TechStart Inc." />
      <InfoField label="Email" value="mail@techstart.com" icon={emailIcon} />
      <InfoField
        label="Phone Number"
        value="+250 784 543 345"
        icon={phoneIcon}
      />

      {/* Business License */}
      <div className="mt-6 border border-gray-200 rounded-lg p-3">
        <InfoField
          label="Business License"
          value="Tech Start inc Business license.pdf"
          icon={licenseIcon}
          isLink={true}
          link="/files/business-license.pdf"
        />
      </div>
    </div>
  );
};

export default CompanyInformationCard;
