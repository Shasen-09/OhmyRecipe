import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { useSidebar } from "../../context/SidebarContext";

const Profile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { isOpen } = useSidebar();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/user/getProfile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFormData(res.data);
      } catch (err) {
        setMessage("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.put("/user/updateProfile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFormData(res.data);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 text-blue-700 font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 p-6 ${isOpen ? "ml-64" : "ml-16"
          }`}
      >
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">
          <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
            Edit Profile
          </h1>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-blue-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border border-blue-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-blue-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-blue-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-blue-700 font-medium mb-2">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact"
                className="w-full border border-blue-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {message && (
              <p className="text-center text-sm text-red-500 font-medium">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
