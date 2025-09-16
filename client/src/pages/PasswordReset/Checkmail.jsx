import React from "react";

const CheckEmail = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-80 text-center space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Check Your Email</h2>
        <p>
          We’ve sent a password reset link to your email. <br />
          Please click the link to reset your password.
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
