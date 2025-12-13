import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Failure() {
  // Auto redirect back to Premium page in 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/premium";
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
          Payment Failed
        </h1>

        <p className="text-gray-700 mb-6">
          Unfortunately, we couldn't process your payment.<br />
          Please try again. You will be redirected shortly.
        </p>

        <Link to="/premium">
          <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-semibold">
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
}
