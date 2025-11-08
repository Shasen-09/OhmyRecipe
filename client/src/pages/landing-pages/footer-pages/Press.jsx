import React from "react";
import NavBAr from "../../NavBAr";
import Footer from "../Footer";

const Press = () => (
  <div className="flex flex-col min-h-screen">
    <NavBAr />
    <div className="max-w-3xl mx-auto py-12 px-6 text-center flex-1">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Press</h1>
      <p className="text-gray-700 leading-relaxed">
        Check out news coverage and media mentions about our platform.
      </p>
    </div>
    <Footer />
  </div>
);

export default Press;
