// src/components/Pending.tsx
import React from "react";
import { Link } from "react-router-dom";


// ------------------- Component -------------------
const Pending: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-primaryColor-10 via-primaryColor-10 to-accent-10 flex flex-col md:flex-row justify-center items-center gap-10 p-5">
            {/* ------------------- Left Side ------------------- */}
            <div className=" flex gap-40 ">
                <div className="  flex flex-col justify-center  items-center">
                    <h2 className="text-primaryColor-800 font-bold text-2xl ">
                        Stay Organized, Stay Ahead
                    </h2>
                    <p className="text-accent-800 mb-10 ">
                        Sign in to submit new requests or follow up on <br /> approvals all in one
                        place.
                    </p>
                    <div className="mt-10">
                        <img src="pana.png" alt="illustration" className="w-96" />
                    </div>
                </div>

                {/* ------------------- Right Side Card ------------------- */}
                <div className="flex justify-center  flex-col items-center  gap-30 md:w-1/2">
                    <div className="flex items-center gap-2   ">
                        <img src="logo.svg" alt="logo" className="h-10 w-10" />
                        <h1 className="font-bold text-xl">
                            <span className="text-primaryColor-700">Mission</span>
                            <span className="text-accent-700">Track.</span>
                        </h1>
                    </div>
                    <div className="p-8 bg-white rounded-xl shadow-lg max-w-sm w-full  space-y-6 text-center">
                        <h2 className="text-3xl font-bold text-accent-600">Pending</h2>
                        <p className="text-gray-600">
                            Almost there! Your access will be activated after review. Please check your email for updates.
                        </p>
                        <Link to={"/home"}
                        className="w-full px-4 py-3 bg-primaryColor-800 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150 ease-in-out">
                            Back to Home
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Pending;
