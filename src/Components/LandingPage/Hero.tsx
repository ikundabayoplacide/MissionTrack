import React from "react";
import rectImg from "../../assets/Rectangle51.jpg";
import dashImg from "../../assets/Group40.png";
import frameImg from "../../assets/Frame400.png"
import { Link } from "react-router-dom";



const Hero: React.FC = () => {
  return (
    <div className="h-[650px] w-full font-bold relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${rectImg})` }}
      ></div>

      {/* Gradient overlay */}
     <div className="absolute inset-0 bg-D9D9D9"></div>

      {/* Content */}
      <div className="relative flex justify-center">
        <div className="h-[600px]  w-[1300px]">
          {/* Left text */}
          <div className="mt-20 m-auto flex   items-center justify-between">
            <div className="flex flex-col  gap-10">
              <div className="flex flex-col max-sm:mt-0 max-sm:ml-2 gap-4 max-sm:gap-10">
                <p className="text-gray-800 max-sm:text-xl text-7xl leading-18">
                  Your Missions,
                  <br />
                  Streamlined from <br />
                  <span className="bg-gradient-to-r from-[#4D8FFA]/70 to-[#11A677]/70 bg-clip-text text-transparent">
                    Start to Approval.
                  </span>
                </p>
                <p className="text-gray-800 text-sm max-sm:text-sm">
                  From Request to mission expenses. All in One Flow
                </p>
              </div>
              <div className="flex justify-center gap-5">
                <Link to="/login" className="bg-primaryColor-700 text-white rounded-lg px-15 max-sm:p-1 ml-2 py-2">
                  Get Started
                </Link>
                <button className="bg-accent-400 text-white rounded-lg px-15 max-sm:p-1 ml-2 py-2">
                  Request Demo
                </button>
              </div>
            </div>

            {/* Right images stacked */}
            <div className="relative h-120 w-auto max-sm:h-100">
              <img
                src={dashImg}
                alt="Mission preview background"
                className="h-120 w-auto max-sm:h-100 border-gray-50"
              />
              <img
                src={frameImg}
                alt="Mission preview overlay"
                className="relative  w-[400px] bottom-10 left-20 h-30  border-gray-50 z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
