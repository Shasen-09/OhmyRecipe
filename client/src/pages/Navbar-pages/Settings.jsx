import React, { useState } from "react";
import PasswordSecurity from "./settings/PasswordSecurity";
import DangerZone from "./settings/DangerZone";
import Sidebar from "../Sidebar";
import { useSidebar } from "../../context/SidebarContext";
import Preferences from "./settings/Preferences";

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState("Password & Security");
  const { isOpen } = useSidebar();

  const sections = [

    "Password & Security",

    "Preferences",

    "Danger Zone",
  ];

  const renderSection = () => {
    switch (selectedSection) {

      case "Password & Security":
        return <PasswordSecurity />;
      case "Preferences":
        return <Preferences />;
      case "Danger Zone":
        return <DangerZone />;
      default:
        return <PasswordSecurity />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 flex-1 min-h-screen p-8 bg-gray-50 ${isOpen ? "ml-64" : "ml-16"
          }`}
      >
        {/* Section Navigation */}
        <div className="flex flex-wrap gap-3 mb-6">
          {sections.map((section) => (
            <button
              key={section}
              className={`px-4 py-2 rounded-md font-medium ${selectedSection === section
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-100"
                }`}
              onClick={() => setSelectedSection(section)}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Right Panel (Full Width Content) */}
        <div className="w-full bg-white rounded-lg shadow p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
