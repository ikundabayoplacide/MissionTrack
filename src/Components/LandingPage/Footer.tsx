import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-r from-primaryColor-10 to-[#11A677] pt-32">
      {/* Call-to-action box (floating) */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl">
        <div className="bg-primaryColor-900 text-center p-6 rounded-2xl shadow-lg">
          <p className="text-white leading-relaxed text-lg">
            Don’t let manual processes slow your team down.
            <br /> See how easy mission management can be.
          </p>
          <button className="bg-white text-primaryColor-900 px-4 py-2 rounded-md font-semibold text-sm mt-6 hover:bg-gray-100 transition">
            Apply Now
          </button>
        </div>
      </div>
      <div className="mt-30">
        {/* Footer content */}
        <div className="max-w-6xl mx-auto  flex justify-between pb-10 mt-[50px]">
          {/* Logo & Title */}
          <div className=" flex flex-col text-center">
          <div className="flex items-center gap-5">
            <img src="src/assets/logo.svg" className="h-15" alt="Mission Track Logo" />
            <h1 className="font-bold text-3xl max-sm:text-2xl text-transparent bg-clip-text">
              <span className="text-primaryColor-700">Mission</span>{" "}
              <span className="text-accent-700">Track.</span>T
            </h1>
          </div>
          
          <p className="mt-5">Simplifying mission requests and <br/> approvals for organizations of all sizes</p>
          </div>

          {/* Links */}

          <div>
            <h2 className="mb-4 text-xl font-semibold">Product</h2>
            <div className="flex flex-col gap-2 text-gray-800">
              <a href="#" className="hover:text-primaryColor-700 transition">
                How it works
              </a>
              <a href="#" className="hover:text-primaryColor-700 transition">
                Features
              </a>
              <a href="#" className="hover:text-primaryColor-700 transition">
                Pricing
              </a>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-semibold">Resources</h2>
            <div className="flex flex-col gap-2 text-gray-700">
              <a href="#" className="hover:text-primaryColor-700 transition">
                FAQs
              </a>
              <a href="#" className="hover:text-primaryColor-700 transition">
                Help Center
              </a>
              <a href="#" className="hover:text-primaryColor-700 transition">
                Contact Us
              </a>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-semibold">Company</h2>
            <div className="flex flex-col gap-2 text-gray-800">
              <a href="#" className="hover:text-primaryColor-700 transition">
                About Us
              </a>
              <a href="#" className="hover:text-primaryColor-700 transition">
                Careers
              </a>
              <a href="#" className="hover:text-primaryColor-700 transition">
                Blog
              </a>
            </div>
          </div>
        </div>

      </div>


      {/* Bottom bar */}
      <div className="border border-primaryColor-10 bg-primaryColor-10 p-4">
        <p className="text-gray-700 font-bold text-sm text-center">
          © {new Date().getFullYear()} Mission Track. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
