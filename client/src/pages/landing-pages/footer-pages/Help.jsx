import React from "react";
import NavBAr from "../../NavBAr";
import Footer from "../Footer";

const Help = () => (
  <div className="flex flex-col min-h-screen">
    <NavBAr />
    <main className="flex-1 max-w-3xl mx-auto py-12 px-6 text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Help Center</h1>
      <p className="text-gray-700 leading-relaxed">
        Find answers to your questions, troubleshoot issues, or contact support.
      </p>
    </main>
    <Footer />
  </div>
);


export default Help;
