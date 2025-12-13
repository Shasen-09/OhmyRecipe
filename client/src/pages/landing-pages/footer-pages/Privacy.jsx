import React from "react";
import Footer from "../Footer";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="text-3xl ml-5 mt-5">
        <button onClick={() => navigate("/")} className="cursor-pointer">
          <IoArrowBackOutline />
        </button>
      </div>

      <div className="max-w-3xl mx-auto py-12 px-6 text-center flex-1">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Privacy Policy</h1>
        <p className="text-gray-700 leading-relaxed">
          Learn how we protect your personal information and data privacy.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
