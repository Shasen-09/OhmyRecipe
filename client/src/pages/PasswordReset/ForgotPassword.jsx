import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/user/forgot-password",
        { email }
      );
      alert(response.data.message);

      navigate("/check-email");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Enter your email to receive a password reset link
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
