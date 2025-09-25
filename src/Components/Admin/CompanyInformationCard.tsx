import React from "react";

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
  const documentIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-label="Company Information"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5h-7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"
      />
    </svg>
  );

  const emailIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-label="Email"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.893 5.421a1.99 1.99 0 002.214 0L21 8m-2 4a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v5z"
      />
    </svg>
  );

  const phoneIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-label="Phone"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.293a1 1 0 01.707.293l1.293 1.293a1 1 0 01.293.707V12a1 1 0 01-1 1H9a1 1 0 01-1-1v-2a1 1 0 011-1h1a1 1 0 011 1v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2zm9 0a2 2 0 012-2h3.293a1 1 0 01.707.293l1.293 1.293a1 1 0 01.293.707V12a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2a1 1 0 011-1h1a1 1 0 011 1v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2z"
      />
    </svg>
  );

  const licenseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-label="License"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5h-7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"
      />
    </svg>
  );

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
