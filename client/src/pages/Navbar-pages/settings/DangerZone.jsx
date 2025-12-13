import React, { useState } from "react";

const DangerZone = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);

    try {
      const token = localStorage.getItem("token");

      console.log("Token from localStorage:", token);
      if (!token) throw new Error("User is not authenticated");

      const response = await fetch("/user/deleteaccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("lastBookmarkedId");

        window.location.href = "/login";

      } else {
        alert(data.message || "Failed to delete account");
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-red-600">Danger Zone</h2>
      <p className="text-gray-700">
        Deleting your account is permanent and cannot be undone. Please proceed with caution.
      </p>

      <div className="p-6 border rounded-lg bg-red-50">
        <h3 className="text-lg font-semibold text-red-600">Delete Account</h3>
        <p className="text-gray-700 my-2">
          Permanently remove your account and all associated data.
        </p>
        <button
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default DangerZone;
