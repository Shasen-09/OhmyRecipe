import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordSecurity = () => {
  const [oldPassword, setOldPassword] = useState("");
  const navigate = useNavigate();


  const rules = {
    length: oldPassword.length >= 8,
    uppercase: /[A-Z]/.test(oldPassword),
    number: /\d/.test(oldPassword),
    special: /[!@#$%^&*]/.test(oldPassword),
  };

  const passed = Object.values(rules).filter(Boolean).length;

  const status =
    passed >= 4
      ? { label: "Secure", color: "bg-green-100 text-green-700" }
      : passed >= 2
        ? { label: "Medium", color: "bg-yellow-100 text-yellow-700" }
        : { label: "Weak", color: "bg-red-100 text-red-700" };

  return (
    <div className="max-w-4xl bg-white rounded-2xl shadow-md p-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">
        Password & Security
      </h2>

      {/* Password Status */}
      <div className="bg-gray-50 border rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-800">Password Status</p>
            <p className="text-sm text-gray-500">
              Enter your current password to check strength
            </p>
          </div>

          {oldPassword && (
            <span
              className={`px-4 py-1 text-sm font-semibold rounded-full ${status.color}`}
            >
              {status.label}
            </span>
          )}
        </div>

        <input
          type="password"
          placeholder="Enter current password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Rules */}
        <ul className="mt-5 space-y-2 text-sm">
          <li className={rules.length ? "text-green-600" : "text-gray-600"}>
            • Minimum 8 characters
          </li>
          <li className={rules.uppercase ? "text-green-600" : "text-gray-600"}>
            • At least one uppercase letter
          </li>
          <li className={rules.number ? "text-green-600" : "text-gray-600"}>
            • At least one number
          </li>
          <li className={rules.special ? "text-green-600" : "text-gray-600"}>
            • At least one special character
          </li>
        </ul>
      </div>

      {/* Reset Password */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">
          Reset Password
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          For security reasons, password changes are handled separately.
        </p>

        <button
          onClick={() => navigate("/forgot")}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Go to Reset Password
        </button>
      </div>
    </div>
  );
};

export default PasswordSecurity;
