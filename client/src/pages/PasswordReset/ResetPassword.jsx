// pages/PasswordReset/ResetPassword.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) return setErrorMessage("Fill all fields");
    if (password !== confirmPassword) return setErrorMessage("Passwords do not match");

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await axios.post(`/user/reset-password/${token}`, { password, confirmPassword });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Reset Password</h2>
        {errorMessage && <p className="text-red-600 text-sm text-center">{errorMessage}</p>}

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
