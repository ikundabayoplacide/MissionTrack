import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="h-[650px] w-full font-bold relative overflow-hidden">
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-lg"
        style={{ backgroundImage: "url('src/assets/Rectangle52.jpeg')" }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primaryColor-10 via-primaryColor-100 to-accent-10"></div>

      {/* Content */}
      <div className="relative flex justify-center">
        <div className="h-[600px] w-[1300px]">
          {/* Left text */}
          <div className="h-[400px] w-[1000px] mt-30 ml-30 flex items-center justify-between">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col max-sm:mt-0 max-sm:ml-2 gap-4 max-sm:gap-10">
                <p className="text-gray-800 max-sm:text-xl text-4xl">
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
              <div>
                <button className="bg-primaryColor-500 text-white rounded-lg px-6 max-sm:p-1 ml-2 py-2">
                  Get Started
                </button>
              </div>
            </div>

            {/* Right images stacked */}
            <div className="relative h-120 w-auto max-sm:h-100">
              {/* Base image */}
              <img
                src="src/assets/dash.png"
                alt="Mission preview background"
                className="h-120 w-auto max-sm:h-100 border-gray-50"
              />
              {/* Overlay image positioned at top-left */}
              <img
                src="src/assets/Frame402.png"
                alt="Mission preview overlay"
                className="absolute top-0 left-0 h-40 w-auto border-gray-50 z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
