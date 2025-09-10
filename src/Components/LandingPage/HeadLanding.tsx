import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom"; // ✅ Correct import

const HeadLanding: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white w-full h-20 max-sm:h-15 shadow-sm border-b fixed top-0 left-0 z-50 border-gray-200 px-8 max-sm:px-2 py-6 max-sm:py-0">
      <div className="flex justify-between max-sm:mt-2 items-center">
        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          className="sm:hidden top-4 left-4 z-50 p-2 rounded-md bg-primaryColor-600 text-black"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex justify-between gap-4">
          <img src="src/assets/logo.svg" alt="" />
          <h1 className=" font-bold text-3xl mt-1 max-sm:text-2xl  text-transparent bg-clip-text">
            <span className="text-primaryColor-700">Mission</span> <span className="text-accent-700">Track</span>T
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex justify-between gap-10">
          <Link to="/">Features</Link>
          <Link to="/">How it works</Link>
          <Link to="/">Testimonials</Link>
          <Link to="/">Pricing</Link>
        </nav>

        {/* Sign Up Button */}
        <div>
          <Link
            to="/login"
            className="bg-primaryColor-500 text-white border rounded-md px-[8px] py-1"
          >
            Log in
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sm:hidden fixed top-16 left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-start px-4 py-4 gap-4 z-40">
          <Link to="/" className="text-gray-800">
            Home
          </Link>
          <Link to="/request" className="text-gray-800">
            Request
          </Link>
          <Link to="/track" className="text-gray-800">
            Track
          </Link>
        </div>
      )}
    </header>
  );
};

export default HeadLanding;
